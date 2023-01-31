import { Movie, TvShow } from "@/data";
import {
  Text,
  Box,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Image from "next/image";
import ItemCard from "@/components/ItemCard";
import { useState } from "react";
import ItemCardSkeleton from "@/components/ItemCardSkeleton";
type FilterType = "movie" | "tvShow" | "all";
const Home = () => {
  const getMarvel = async (
    typeFilter: FilterType
  ): Promise<Array<TvShow | Movie>> => {
    const res = await fetch(
      `/api/marvel?type=${typeFilter == "all" ? "" : typeFilter}`
    );
    return res.json();
  };
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const { data = [], isLoading } = useQuery(["marvel", typeFilter], () =>
    getMarvel(typeFilter)
  );

  return (
    <Box m={"2rem 2vw"} p={1}>
      {/* <pre>{JSON.stringify(data, n)ull, 2)}</pre> */}
      <RadioGroup
        onChange={(nextValue: "movie" | "tvShow" | "all") =>
          setTypeFilter(nextValue)
        }
        value={typeFilter}
      >
        <Stack direction="row">
          <Radio value="all">All</Radio>
          <Radio value="movie">Movie</Radio>
          <Radio value="tvShow">Tv Show</Radio>
        </Stack>
      </RadioGroup>

      <Grid
        gap={"2"}
        mt="2rem"
        listStyleType="none"
        p={0}
        gridTemplateColumns={"repeat(auto-fit, minmax(150px, 1fr))"}
      >
        {isLoading && (
          <>
            {Array.from({ length: 15 }, (_, index) => index).map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))}
          </>
        )}
        {data.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Grid>
      <Box></Box>
    </Box>
  );
};

export default Home;
