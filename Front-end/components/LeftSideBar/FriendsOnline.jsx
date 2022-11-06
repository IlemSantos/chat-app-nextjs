import { Avatar, AvatarBadge, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export default function FriendOnline({ data }) {
  return (
    <VStack w="full" alignItems="start" px={8}>
      <HStack w="full" justifyContent="space-between">
        <Heading fontSize="sm">Friends Online</Heading>
        <Text fontSize="sm">{"23"}</Text>
      </HStack>
      <HStack gap={1}>
        {
          data.map((friend, index) => (
            <Avatar size="sm" key={index} name={friend.nome} src={friend.src}>
              <AvatarBadge boxSize={3} bg="green.500" />
            </Avatar>
          ))
        }
      </HStack>
    </VStack>
  );
}
