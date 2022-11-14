import { Avatar, AvatarBadge, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, VStack } from "@chakra-ui/react"
import { RiInstagramFill, RiTwitterFill, RiGithubFill } from "react-icons/ri"
import Link from "next/link"

export default function Profile({ name, srcProfile }) {
  return (
    <VStack>
      <Menu>
        <MenuButton>
          <Avatar name={name} src={srcProfile} size="lg">
            <AvatarBadge boxSize={5} bg="green.500" />
          </Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem><Link href="/accounts/edit">Edit profile</Link></MenuItem>
        </MenuList>
      </Menu>
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
