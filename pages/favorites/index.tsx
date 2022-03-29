import { useState, useEffect } from "react";
import { NextPage } from "next";

import { Layout } from "../../components/layouts";
import { FavoritesEmpty } from "../../components/ui/FavoritesEmpty";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.getPokemons);
  }, []);

  return (
    <Layout title="Favorite Pokemons">
      {favoritePokemons.length > 0 ? (
        <FavoritePokemons favoritePokemons={favoritePokemons} />
      ) : (
        <FavoritesEmpty />
      )}
    </Layout>
  );
};

export default FavoritesPage;
