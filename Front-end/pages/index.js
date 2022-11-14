import { useContext } from 'react'
import { Flex, HStack } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import { getAPIClient } from '../services/axios'

import Layout from "../components/Layout"
import LeftSideBar from '../components/LeftSideBar'
import Chat from '../components/Chat'
import ChatFiles from '../components/ChatFiles'

export default function Home() {
  const { user } = useContext(AuthContext)

  return (
    <Layout>
      <HStack height={"100vh"} spacing={0}>
        <Flex as="aside" width="full" maxW="md" height="full" borderRightColor="gray.100" borderRightWidth={1}>
          <LeftSideBar user={user} />
        </Flex>

        <Flex as="main" height="full" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
          <Chat />
        </Flex>

        <Flex as="aside" width="full" maxW="sm" height="full">
          <ChatFiles />
        </Flex>
      </HStack>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.access_token']: access_token } = parseCookies(ctx)

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