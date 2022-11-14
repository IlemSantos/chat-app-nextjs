import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";

import PhotoEdit from "./PhotoEdit"
import FormEdit from "./FormEdit"

export default function EditProfile({ user }) {
  return (
    <>
      <Heading p={6}>Edit Profile</Heading>

      <Box w="full" px={6}>
        <Divider color="gray.100" />
      </Box>

      <HStack width="full" height="full" pt={6} display={["none", "none", "flex", "flex"]}>
        <PhotoEdit user={user} />

        <FormEdit />
      </HStack>

      <VStack width="full" height="full" pt={6} display={["flex", "flex", "none", "none"]}>
        <PhotoEdit user={user} />

        <FormEdit />
      </VStack>
    </>
  )
}