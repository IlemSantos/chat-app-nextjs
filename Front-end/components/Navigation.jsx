import { VStack, Image, IconButton, Tooltip } from "@chakra-ui/react";
import { MdDashboard, MdLogout, MdMail, MdMoreHoriz, MdSettings } from "react-icons/md";
import { HiLightningBolt, HiBell, HiTag, HiSearch } from "react-icons/hi";
import { setCookie } from 'nookies'
import { useRouter } from "next/router"
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();

  function logout() {
    setCookie(undefined, 'nextauth.access_token', "access_token", {
      maxAge: 1,
      path: '/',
    })

    router.push('/auth/signin')
  }

  return (
    <VStack justifyContent="space-between" px={3} py={6}>
      <VStack>
        <Link href="/">
          <a>
            <Image src="/dccord.png" alt="Logo DCCord " boxSize="50px" mt={5} mb={10} />
          </a>
        </Link>
        {/* IconButtons with Tooltips */}
        <Tooltip label="Dashboard" placement="right">
          <IconButton
            color="gray.500"
            icon={<MdDashboard />}
            aria-label="Dashboard"
          />
        </Tooltip>
        <Tooltip label="Actions" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiLightningBolt />}
            aria-label="Actions"
          />
        </Tooltip>
        <Tooltip label="Search" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiSearch />}
            aria-label="Search"
          />
        </Tooltip>
        <Tooltip label="Notifications" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiBell />}
            aria-label="Notifications"
          />
        </Tooltip>
        <Tooltip label="Tags" placement="right">
          <IconButton color="gray.500" icon={<HiTag />} aria-label="Tags" />
        </Tooltip>
        <Tooltip label="Messages" placement="right">
          <IconButton
            color="gray.500"
            icon={<MdMail />}
            aria-label="Messages"
          />
        </Tooltip>
      </VStack>

      <VStack>
        <Tooltip label="Settigns" placement="right">
          <IconButton icon={<MdSettings />} aria-label="Settigns" />
        </Tooltip>
        <Tooltip label="More" placement="right">
          <IconButton icon={<MdMoreHoriz />} aria-label="More" />
        </Tooltip>
      </VStack>

      <Tooltip label="Logout" placement="right">
        <IconButton icon={<MdLogout />} aria-label="Logout" onClick={logout} />
      </Tooltip>
    </VStack>
  );
}
