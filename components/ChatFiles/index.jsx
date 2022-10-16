import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";

import Profile from "./Profile";
import SharedFiles from "./SharedFiles";
import SharedLinks from "./SharedLinks";

const sharedFiles = [
  { src: "/dccord-logo.png", name: "Photo Danver.jpg", date: "10/03/2021", hour: "11:43", size: "175" },
  { src: "/dccord-logo.png", name: "Photo Danver 01.jpg", date: "11/03/2021", hour: "12:43", size: "176" }
];

const sharedLinks = [
  { src: "/dccord-logo.png", link: "Dribbble.com", date: "10/12/2020", hour: "10:32pm" }
];

export default function ChatFiles() {
  return (
    <VStack p={6} w="full">
      <HStack w="full" justifyContent="space-between" px={8}>
        <Text>{"20 March 2021"}</Text>
        <Text>Icone</Text>
      </HStack>

      <Profile
        name="Cleuson"
        srcProfile="https://github.com/cleusonss.png"
      />

      <Box w="full" px={8} py={4}>
        <Divider color="gray.100" />
      </Box>

      <SharedFiles data={sharedFiles} />

      <Box w="full" px={8} py={4}>
        <Divider color="gray.100" />
      </Box>

      <SharedLinks data={sharedLinks} />

    </VStack>
  );
}