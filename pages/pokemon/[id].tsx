import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { pokeApi } from "../../api";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  return (
    <Layout title="Poke info">
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allPokemons = [...Array(151)].map((_, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
