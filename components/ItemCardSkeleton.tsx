import React from "react";
import {
  Text,
  Box,
  GridItem,
  Heading,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Movie, TvShow } from "@/data";

export default function ItemCardSkeleton() {
  return (
    <GridItem
      position={"relative"}
      display="flex"
      flexDirection="column"
      justifyContent={"space-between"}
      height="100%"
      overflow="hidden"
      text-decoration="none"
      cursor="pointer"
    >
      <Box w={"100%"} position="relative" overflow={"hidden"}>
        <Skeleton width={"100%"} height="250px" />
        {/* <img src={cover_url} alt={title} /> */}
      </Box>
      <Box>
        <SkeletonText my="2" noOfLines={1} spacing="0" skeletonHeight="4" />

        <Box display={"flex"} justifyContent="space-between">
          <SkeletonText
            my="0"
            width={"50px"}
            noOfLines={1}
            spacing="0"
            skeletonHeight="30px"
          />
          <Skeleton width={"50px"} height="30px" />
        </Box>
      </Box>
    </GridItem>
  );
}
