import Head from "next/head";
import { FC } from "react";

import { Navbar } from "../ui";

type Props = {
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ title = "Pokemon App", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="CPerez" />
        <meta name="description" content={`Pokemon Info about:${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Pokemon Info about:${title}`} />
        <meta property="og:description" content={`Page about:${title}`} />
        <meta
          property="og:image"
          content={`${origin}/img/pokemon-banner.png`}
        />
      </Head>
      <Navbar />
      <main style={{ padding: "0 20px" }}>{children}</main>
    </>
  );
};
