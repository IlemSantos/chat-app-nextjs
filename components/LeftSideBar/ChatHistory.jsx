import { Box, Heading, Input, List, ListItem, VStack } from "@chakra-ui/react";
import ChatRow from "../ChatRow";

export default function ChatHistory({ data }) {
  return (
    <VStack w="full" alignItems="start" px={8}>
      <Heading fontSize="sm" mb={4}>Chats</Heading>
      <Input
        variant="filled"
        mt={2}
        minH={10}
        rounded="full"
        placeholder="Search chat"
      />
      <Box w="full" pt={6}>
        <List>
          <ListItem>
            {
              data.map((friend, index) => (
                <ChatRow key={index} friend={friend} />
              ))
            }
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
}
