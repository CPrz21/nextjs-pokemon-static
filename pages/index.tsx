import { Button } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";

import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  console.log("🚀 ~ file: index.tsx ~ line 6 ~ pokemons", pokemons);
  return (
    <Layout title="Pokemon List">
      <ul>
        {pokemons.map(({ id, img, name }) => (
          <li key={id}>{`#${id} ${name}`}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = results.map(
    (pokemon: SmallPokemon, index) => {
      const id = index + 1;
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
      return {
        ...pokemon,
        id,
        img,
      };
    }
  );

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
