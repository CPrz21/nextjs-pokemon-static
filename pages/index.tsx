import { Button } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/layouts";

const Home: NextPage = (props) => {
  console.log("🚀 ~ file: index.tsx ~ line 6 ~ props", props);
  return (
    <Layout title="Pokemon List">
      <Button color="gradient">Click me</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log("first");

  return {
    props: {
      name: "carlos",
    },
  };
};

export default Home;
