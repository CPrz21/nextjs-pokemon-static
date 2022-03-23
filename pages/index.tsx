import { Button } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";

import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse } from "../interfaces";

const Home: NextPage = (props) => {
  console.log("🚀 ~ file: index.tsx ~ line 6 ~ props", props);
  return (
    <Layout title="Pokemon List">
      <Button color="gradient">Click me</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  return {
    props: {
      pokemons: data.results,
    },
  };
};

export default Home;
