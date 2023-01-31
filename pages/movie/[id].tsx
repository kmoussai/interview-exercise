import { Movie, TvShow } from "@/data";
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
const getInfo = async (id: number): Promise<TvShow | Movie> => {
  const res = await fetch(`/api/marvel/${id}`);
  return res.json();
};

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(["marvel", id], () =>
    getInfo(parseInt(id as string))
  );

  if (isLoading) return <>loading</>;
  if (!data) return <>Not found</>;

  return (
    <Box p="4">
     
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}
