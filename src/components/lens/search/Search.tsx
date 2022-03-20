import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";

const Search = ({query, setQuery, type, setType} : {query:any, setQuery:any, type:any, setType:any}) => {
    return(
        <Flex alignItems="center">
        <Box px={4} py={32} mx="auto">
        <SimpleGrid
          as="form"
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx="auto"
          mb={8}
        >
          <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
            <VisuallyHidden>{query}</VisuallyHidden>
            <Input
              mt={0}
              size="lg"
              type="text"
              value={query}
              onChange={(e) => {
                  setQuery(e.target.value)
              }}
            />
          </GridItem>

        </SimpleGrid>
    </Box>
    </Flex>
    )
};

export default Search;