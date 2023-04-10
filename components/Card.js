import Image from "next/image";
import { getStaticProps } from "../pages";
import Link from "next/link";

export default function Card({ pokemon }) {
  let pokemonImage = `/images/pokeball.png`;

  const myLoader = ({ src }) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  };

  return (
    <>
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="flex flex-col gap-4 justify-center items-center p-4 hover:scale-110 transition-all">
          <Image
            loader={myLoader}
            src={pokemonImage}
            srcSet={pokemonImage}
            width={200}
            height={200}
            alt={pokemon.name}
            priority={true}
          />
          <div className="flex flex-row gap-2 items-center">
            <span className="text-gray-500">#{pokemon.id}</span> |
            <span className="text-xl font-bold">{pokemon.name}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
