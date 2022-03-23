import { Button } from "@nextui-org/react";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <Layout title="Pokemon List">
      <Button color="gradient">Click me</Button>
    </Layout>
  );
};

export default Home;
