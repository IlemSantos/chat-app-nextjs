import { Avatar, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export default function ChatRow({ friend }) {
  return (
    <HStack justifyContent="space-between" my={1}>
      <HStack gap={2}>
        <Avatar size="sm" name={friend.nome} src={friend.src} />
        <VStack spacing={0} sb="5px" alignItems="start">
          <Heading size="xs">{friend.nome}</Heading>
          <Text>Ultima conversa...</Text>
        </VStack>
      </HStack>
      <Text>8:30h</Text>
    </HStack>
  );
}
