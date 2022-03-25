import NextLink from "next/link";
import { Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { pathname } = useRouter();
  const { theme } = useTheme();
  const isFavoritePath = pathname === "/favorites";
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pokemon Icon"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            ókemon
          </Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      {!isFavoritePath && (
        <NextLink href="/favorites" passHref>
          <Link>
            <Text color="white">Favoritos</Text>
          </Link>
        </NextLink>
      )}
    </div>
  );
};
