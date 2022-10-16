import { HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function ChatRow({ file }) {
  return (
    <HStack w="full" justifyContent="space-between" my={1}>
      <Image src={file.src} width={50} height={50} />
      <VStack alignItems="start" justifyContent="space-between">
        <Text fontSize={"lg"}>{file.name}</Text>
        <HStack w="full" justifyContent="space-between">
          <Text>{file.date} at {file.hour}</Text>
          <Text>{file.size} Kb</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
