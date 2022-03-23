import type { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";

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
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map(({ id, img, name }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable>
              <Card.Body css={{ p: 10 }}>
                <Card.Image src={img} width="100%" height={140} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
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
