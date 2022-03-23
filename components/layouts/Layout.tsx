import Head from "next/head";
import { FC } from "react";

import { Navbar } from "../ui";

type Props = {
  title?: string;
};

export const Layout: FC<Props> = ({ title = "Pokemon App", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="CPerez" />
        <meta name="description" content={`Pokemon Info ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main style={{ padding: "0 20px" }}>{children}</main>
    </>
  );
};
