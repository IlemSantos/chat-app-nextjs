import Head from "next/head"
import { Flex, HStack } from "@chakra-ui/react"

import Navigation from "./Navigation"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>DCCord App</title>
        <meta name="description" content="DCCord UFRR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HStack height={"100vh"} spacing={0}>
        <Flex as="nav" maxW="xs" height="full" bg="gray.100">
          <Navigation />
        </Flex>

        <Flex direction="column" width="full" height="full">
          {children}
        </Flex>
      </HStack>
    </>
  )
}