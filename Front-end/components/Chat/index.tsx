import { useContext, useEffect, useState } from "react"
import { Flex, Heading, HStack, IconButton, Image, Input, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { IoSend, IoDocuments } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import { HiChat } from "react-icons/hi";
import { useRef } from "react";


import ChatBubble from "./ChatBubble";
import socket from "./socket";

type Message = {
  username: string,
  image: string
  message: string;
}

interface User {
  username: string
  image: string
}

export default function Chat({ username, image }: User) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<Message>>([]);
  const inputRef = useRef(null)

  useEffect(() => {
    // this.usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  })

  socket.on("connect", () => {
    console.log(socket.connected); // true
  });

  socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });

  socket.on('chat message', function (msg) {
    setMessages([
      ...messages,
      { username: msg.username, image: msg.image, message: msg.message }
    ])
  });

  function sendMessage(e: any) {
    setMessage(e.target.value)

    if (e.key == "Enter" && message) {
      e.target.value = ""

      socket.emit("chat message", {
        username: username,
        image: image,
        message,
      });

      setMessage("");
    }
  }

  function SendMessage() {
    if (message) {
      (inputRef.current as any).value = ""

      socket.emit("chat message", {
        username: username,
        image: image,
        message,
      });

      setMessage("");
    }
  }

  return (
    <Flex w="full" flexDirection="column">
      <HStack w="full" p={4} borderBottomColor="gray.100" borderBottomWidth={1} bg="primary" >
        <VStack maxW={60} w="full" spacing={0}>
          <Heading as="h2" size="md">
            Canal #roraima
          </Heading>
        </VStack>

        <HStack flex={1} w="full">
          <Input variant="filled" mt={2} minH={10} rounded="full" placeholder="Search friends" />
        </HStack>
      </HStack>

      <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
        {messages.map((message, index) => (
          <ChatBubble key={index} text={message.message} username={message.username} image={message.image} isSender={message.username == username ? true : false} />
        ))}
      </Flex>

      <Flex pl={4} pr={2} py={8} borderTopColor="brand.500" borderTopWidth={1} bg="gray.100" color="gray.700" >
        <Input
          variant="unstyled"
          placeholder="Digite sua mensagem"
          rounded="full"
          borderColor="brand.500"
          borderWidth={1}
          px={4}
          ref={inputRef}
          onKeyUp={(e) => sendMessage(e)}
        />

        <IconButton
          colorScheme="cyan"
          aria-label="Send message"
          variant="ghost"
          icon={<IoSend />}
          onClick={SendMessage}
        />
      </Flex>
    </Flex>
  )
}