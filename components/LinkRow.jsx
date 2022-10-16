import { HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function LinkRow({ link }) {
  return (
    <HStack w="full" justifyContent="space-between" my={1}>
      <HStack w="full">
        <Image src={link.src} width={15} height={15} alt="icone" />
        <VStack alignItems="start">
          <Text>{link.link}</Text>
          <Text fontSize="sm">{link.date}</Text>
        </VStack>
      </HStack>
      <Text fontSize="sm">{link.hour}</Text>
    </HStack>
  );
}
