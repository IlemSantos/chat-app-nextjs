import { VStack, Box, Avatar } from "@chakra-ui/react";

interface MessageProps {
  username: string;
  image: string,
  text: string;
  isSender: boolean;
}

export default function ChatBubble({ username, image, text, isSender }: MessageProps) {
  const alignment = isSender ? "flex-end" : "flex-start";
  const bottomRightRadius = isSender ? 0 : 32;
  const bottomLeftRadius = isSender ? 32 : 0;

  return (
    <VStack mt={6} alignItems={alignment} alignSelf={alignment}>
      <Avatar name={username} src={image} size="sm" />

      <Box
        bg={isSender ? "blue.50" : "gray.100"}
        px={6}
        py={4}
        maxW={96}
        borderTopLeftRadius={32}
        borderTopRightRadius={32}
        borderBottomLeftRadius={bottomLeftRadius}
        borderBottomRightRadius={bottomRightRadius}
      >
        {text}
      </Box>
    </VStack>
  );
}