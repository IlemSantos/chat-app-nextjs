import { Box, Heading, HStack, List, ListItem, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import FileRow from '../FileRow'

export default function SharedFiles({ data }) {
  return (
    <VStack w="full" alignItems="start" px={8}>
      <HStack w="full" justifyContent="space-between">
        <Heading fontSize="sm">Shared Files</Heading>
        <Link href="#"><a>see all</a></Link>
      </HStack>

      <Box w="full">
        <List>
          <ListItem>
            {
              data.map((file, index) => (
                <FileRow key={index} file={file} />
              ))
            }
          </ListItem>
        </List>
      </Box>

    </VStack>
  );
}