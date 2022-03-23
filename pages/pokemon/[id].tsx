import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../components/layouts";

const PokemonPage = () => {
  const router = useRouter();
  console.log(
    "🚀 ~ file: [id].tsx ~ line 6 ~ PokemonPage ~ router",
    router.query
  );
  return (
    <Layout title="Poke info">
      <h1>Hello Pokemon</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here

  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here

  return {
    props: {},
  };
};

export default PokemonPage;
