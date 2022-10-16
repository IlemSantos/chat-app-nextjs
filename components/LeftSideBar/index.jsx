import { VStack, Divider, Box } from "@chakra-ui/react";

import Profile from "./Profile";
import FriendOnline from "./FriendsOnline";
import ChatHistory from "./ChatHistory";

const onlineFriends = [
  { nome: "Cleuson", src: "https://github.com/cleusonss.png" },
  { nome: "Lucas", src: "https://github.com/llBessa.png" },
  { nome: "Victor", src: "https://github.com/mandaver.png" },
  { nome: "Ilem", src: "https://github.com/ilemsantos.png" },
];

export default function LeftSideBar() {
  return (
    <VStack p={6} w="full">
      <Profile
        name="Ilem Santos"
        srcProfile="https://github.com/ilemsantos.png"
      />

      <Box w="full" px={8} py={4}>
        <Divider color="gray.100" />
      </Box>

      <FriendOnline data={onlineFriends} />

      <Box w="full" px={8} py={4}>
        <Divider color="gray.100" />
      </Box>

      <ChatHistory data={onlineFriends} />
    </VStack>
  );
}