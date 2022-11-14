import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import { getAPIClient } from "../../services/axios";
import { parseCookies } from "nookies";

import EditProfile from '../../components/EditProfile'
import Layout from '../../components/Layout'

export default function Edit() {
  const { user } = useContext(AuthContext)

  return (
    <Layout>
      <EditProfile user={user} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const apiClient = getAPIClient(context);
  const { ['nextauth.access_token']: access_token } = parseCookies(context)

  if (!access_token) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      }
    }
  }

  await apiClient.get('/auth/user')

  return {
    props: {}
  }
}