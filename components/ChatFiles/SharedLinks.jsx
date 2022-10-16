import { Box, Heading, HStack, List, ListItem, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import LinkRow from '../LinkRow'

export default function SharedLinks({ data }) {
  return (
    <VStack w="full" px={8}>
      <HStack w="full" justifyContent="space-between">
        <Heading fontSize="sm">Shared Links</Heading>
        <Link href="#"><a>see all</a></Link>
      </HStack>

      <Box w="full">
        <List>
          <ListItem>
            {
              data.map((link, index) => (
                <LinkRow key={index} link={link} />
              ))
            }
          </ListItem>
        </List>
      </Box>

    </VStack>
  );
}