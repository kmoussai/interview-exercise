import React from "react";
import { Text, Box, GridItem, Heading } from "@chakra-ui/react";
import { Movie, TvShow } from "@/data";
import { useRouter } from "next/router";

export default function ItemCard(props: { item: TvShow | Movie }) {
  const { cover_url, release_date, id, title, type } = props.item;
  const { push } = useRouter();
  return (
    <a href={`/movie/${id}`} onClick={(e) => e.preventDefault()}>
      <GridItem
        position={"relative"}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
        height="100%"
        overflow="hidden"
        text-decoration="none"
        cursor="pointer"
        onClick={() => push(`/movie/${id}`)}
      >
        <Box
          _hover={{
            border: "1px solid transparent",
          }}
          w={"100%"}
          position="relative"
          overflow={"hidden"}
          minH={"200px"}
        >
          <img
            width={"100%"}
            loading="lazy"
            height="auto"
            src={cover_url}
            alt={title}
          />
        </Box>
        <Box>
          <Heading
            as="h3"
            size="sm"
            p="0"
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow="ellipsis"
          >
            {title}
          </Heading>
          <Box display={"flex"} justifyContent="space-between">
            <Text> {release_date && new Date(release_date).getFullYear()}</Text>
            <Box p={"2px 4px"} borderRadius="3px" border={"1px solid #aaa"}>
              {type}
            </Box>
          </Box>
        </Box>
      </GridItem>
    </a>
  );
}
