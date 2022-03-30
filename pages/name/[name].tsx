import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { getPokemonInfo, localFavorites } from "../../utils";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { pokeApi } from "../../api";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const {
    id,
    name,
    sprites: {
      other: {
        dream_world: { front_default: front = "/no-image.png" } = {},
      } = {},
      front_default,
      back_default,
      front_shiny,
      back_shiny,
    },
  } = pokemon;

  const [isInFavorites, setIsInFavorites] = useState<boolean>();

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(id));
  }, [id]);

  const onToggleFavorite = () => {
    console.log("Favoritos!");
    localFavorites.toggleFavorites(id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image src={front} alt={name} width="100%" height={200} />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text transform="capitalize" h1>
                {name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites
                  ? "Eliminar de favoritos"
                  : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image src={back_default} alt={name} width={100} height={100} />
                <Image src={front_shiny} alt={name} width={100} height={100} />
                <Image src={back_shiny} alt={name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
