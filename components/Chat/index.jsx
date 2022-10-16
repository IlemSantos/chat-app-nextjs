import { Input, VStack } from "@chakra-ui/react";

export default function LeftSideBar() {
  return (
    <VStack p={6} w="full">
      <Input
        variant="filled"
        mt={2}
        minH={10}
        rounded="full"
        placeholder="Search friends"
      />

    </VStack>
  );
}