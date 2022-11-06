import { Avatar, AvatarBadge, Heading, HStack, IconButton, VStack } from "@chakra-ui/react";
import { RiInstagramFill, RiTwitterFill, RiGithubFill } from "react-icons/ri"

export default function Profile({ name, srcProfile }) {
  return (
    <VStack>
      <Avatar name={name} src={srcProfile} size="lg">
        <AvatarBadge boxSize={5} bg="green.500" />
      </Avatar>
      <Heading fontSize="xl">{name}</Heading>
      <HStack>
        <IconButton
          color="gray.500"
          icon={<RiGithubFill />}
          aria-label="Actions"
          variant="ghost"
          rounded="full"
        />
        <IconButton
          color="gray.500"
          icon={<RiInstagramFill />}
          aria-label="Actions"
          variant="ghost"
          rounded="full"
        />
        <IconButton
          color="gray.500"
          rounded="full"
          icon={<RiTwitterFill />}
          aria-label="Actions"
          variant="ghost"
        />
      </HStack>
    </VStack>
  );
}
