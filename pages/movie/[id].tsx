import { Movie, TvShow } from "@/data";
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
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
    <Box>
      <Box
        pos={"relative"}
        display="flex"
        h="100vh"
        alignItems={"center"}
        justifyContent="center"
      >
        <Box
          zIndex={-1}
          pos="absolute"
          display={"flex"}
          bgImage={data.cover_url}
          bgSize="cover"
          filter="blur(8px)"
          bgRepeat="no-repeat"
          bgPosition="center"
          h="100vh"
          width="100%"
        ></Box>
        <Box
          pos="relative"
          borderRadius={"8px"}
          maxWidth={["80%", "50%"]}
          boxShadow="0px 0px 15px -1px rgba(0,0,0,0.34)"
        >
          <Box
            // p="2"
            zIndex={-1}
            pos="absolute"
            borderRadius={"8px"}
            bgColor={"rgba(255,255,255,0.5)"}
            filter="blur(5px)"
            h="100%"
            width="100%"
          ></Box>
          <Grid
            p="4"
            gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 2fr", "1fr 2fr"]}
            height={["650px", "650px", "750px", "auto", "auto"]}
            overflow="auto"
          >
            <GridItem display="flex" justifyContent={"center"}>
              <Box w={"250px"} position="relative" overflow={"hidden"} p="4px">
                <img
                  style={{ borderRadius: "4px" }}
                  width={"100%"}
                  loading="lazy"
                  height="auto"
                  src={data.cover_url}
                  alt={data.title}
                />
              </Box>
            </GridItem>
            <GridItem
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
            >
              <Box>
                <Box display="flex" gap="1" alignItems="center">
                  <Heading color={"white"} as="h2">
                    {data.title}
                  </Heading>
                  <a
                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                    target={"_blank"}
                  >
                    <img
                      width="50px"
                      height={"auto"}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1150px-IMDB_Logo_2016.svg.png?20200406194337"
                    />
                  </a>
                </Box>

                <Box display={"flex"} gap="2" alignItems="center">
                  <Box
                    p={"2px 4px"}
                    borderRadius="3px"
                    border={"1px solid #aaa"}
                  >
                    <Text color="white">{data.type}</Text>
                  </Box>
                  <Text color="white"> | {data.release_date}</Text>
                  {"duration" in data && (
                    <Text color="white">| {data.duration} min</Text>
                  )}
                </Box>
              </Box>
              <Box p="1">
                <Text color="black">{data.overview}</Text>
              </Box>
              <Box>
                <Heading size="sm" as="h4">
                  Director
                </Heading>
                <Text>{data.directed_by}</Text>
              </Box>
              <Box mt="1" display={"flex"} gap="1">
                {data.trailer_url && (
                  <a href={data.trailer_url} target="_blank">
                    <Button colorScheme="blue">WATCH TRAILER</Button>
                  </a>
                )}
                {"box_office" in data && (
                  <a
                    target={"_blank"}
                    href={`https://www.boxofficemojo.com/title/${data.imdb_id}`}
                  >
                    <Button colorScheme="gray">Box Office</Button>
                  </a>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Box>
        {false && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Box>
    </Box>
  );
}
