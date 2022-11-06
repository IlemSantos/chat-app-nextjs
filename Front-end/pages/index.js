import { useContext } from 'react'
import Head from 'next/head'
import { Flex, HStack } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import { getAPIClient } from '../services/axios'

import Navigation from '../components/Navigation'
import LeftSideBar from '../components/LeftSideBar'
import Chat from '../components/Chat'
import ChatFiles from '../components/ChatFiles'

export default function Home() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>DCCord App</title>
        <meta name="description" content="DCCord UFRR" />
        <link rel="icon" href="/dccord-logo.png" />
      </Head>

      <HStack height={"100vh"} spacing={0}>
        <Flex as="nav" height="full" maxW="sm" bg="gray.100">
          <Navigation />
        </Flex>

        <Flex as="aside" height="full" w="full" maxW="md" borderRightColor="gray.100" borderRightWidth={1}>
          <LeftSideBar user={user} />
        </Flex>

        <Flex as="main" height="full" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
          <Chat />
        </Flex>

        <Flex as="aside" height="full" w="full" maxW="sm">
          <ChatFiles />
        </Flex>
      </HStack>
    </>
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