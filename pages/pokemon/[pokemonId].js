import Image from "next/image";

import "@fontsource/secular-one";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Loading from "../../components/Loading";

export async function getStaticPaths() {
  const maxPokemons = 251;
  const api = "https://pokeapi.co/api/v2/pokemon";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await res.json();

  return {
    props: {
      pokemon: data,
    },
  };
};

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  const [cardImage, setCardImage] = useState("/images/cards/bg_normal.jpg");

  useEffect(() => {
    while (!pokemon) return;

    let cardsBg = [
      { name: "bug", url: "/images/cards/bg_normal.jpg" },
      { name: "dark", url: "/images/cards/bg_normal.jpg" },
      { name: "dragon", url: "/images/cards/bg_normal.jpg" },
      { name: "electric", url: "/images/cards/bg_electric.jpg" },
      { name: "fairy", url: "/images/cards/bg_normal.jpg" },
      { name: "fighting", url: "/images/cards/bg_normal.jpg" },
      { name: "fire", url: "/images/cards/bg_fire.jpg" },
      { name: "flying", url: "/images/cards/bg_flying.jpg" },
      { name: "ghost", url: "/images/cards/bg_ghost.jpg" },
      { name: "grass", url: "/images/cards/bg_grass.jpg" },
      { name: "ground", url: "/images/cards/bg_normal.jpg" },
      { name: "ice", url: "/images/cards/bg_ice.jpg" },
      { name: "normal", url: "/images/cards/bg_normal.jpg" },
      { name: "poison", url: "/images/cards/bg_poison.jpg" },
      { name: "psychic", url: "/images/cards/bg_psychic.jpg" },
      { name: "rock", url: "/images/cards/bg_rock.jpg" },
      { name: "shadow", url: "/images/cards/bg_normal.jpg" },
      { name: "steel", url: "/images/cards/bg_normal.jpg" },
      { name: "unknown", url: "/images/cards/bg_normal.jpg" },
      { name: "water", url: "/images/cards/bg_water.jpg" },
    ];

    let pokemonTypesFlat = pokemon.types.flatMap((item) => {
      return item.type.name;
    });

    let typesOfPokemon = cardsBg.filter((item) => {
      return pokemonTypesFlat.includes(item.name);
    });

    let i = 0;
    const interval = setInterval(() => {
      if (i < typesOfPokemon.length) {
        setCardImage(typesOfPokemon[i].url);
        i++;
      } else if (!typesOfPokemon) {
        setCardImage("/images/cards/bg_normal.jpg");
      } else {
        i = 0;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [pokemon]);

  if (!pokemon) {
    return <Loading></Loading>;
  }

  if (router.isFallback) {
    return <Loading></Loading>;
  }

  let pokemonImage = `/images/pokeball.png`;

  const myLoader = ({ src }) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center p-4">
        <div
          className="flex flex-col justify-around sticky border-red-500 aspect-[7/10] h-full bg-white rounded-3xl sm:-rotate-3 hover:sm:-rotate-6 shadow-lg bg-[image:var(--image-url)] bg-cover bg-center hover:scale-105 transition-all overflow-clip"
          style={{ "--image-url": `url(${cardImage})` }}
        >
          <div className="flex flex-row justify-between">
            <div className="h-fit w-fit bg-gray-800 p-4 sm:-rotate-6 flex flex-row gap-2 shadow-2xl mt-4 sm:mt-8">
              <span className="text-white">Type:</span>
              {pokemon.types.map((item, index) => (
                <span
                  key={index}
                  className="text-2xl text-white font-secular-one"
                >
                  {item.type.name}
                </span>
              ))}
            </div>
            <div className="flex items-center w-full justify-end p-4">
              <span className="text-4xl">#</span>
              <span className="relative z-50 text-5xl sm:text-8xl text-blue-900 text-stroke-2 text-stroke-white drop-shadow-lg font-secular-one">
                {pokemon.id}
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-5xl sm:text-7xl drop-shadow-lg bg-gray-400 sm:-rotate-12 text-center text-white font-secular-one">
              {pokemon.name}
            </h1>
          </div>
          <div className="relative z-50 w-full flex justify-center hover:scale-150 transition-all">
            <Image
              loader={myLoader}
              src={pokemonImage}
              srcSet={pokemonImage}
              width={300}
              height={300}
              alt={pokemon.name}
              priority={true}
            />
          </div>
          <div className="flex flex-row justify-between items-end -mt-10">
            <div className="flex flex-col">
              <div className="h-fit w-fit bg-red-800 p-4 sm:-rotate-12 flex flex-row gap-2 shadow-2xl">
                <span className="text-white">Height:</span>
                <span className="text-2xl text-white font-secular-one">
                  {pokemon.height * 10} cm
                </span>
              </div>
              <div className="h-fit w-fit bg-blue-800 p-4 sm:-rotate-12 flex flex-row gap-2 shadow-2xl">
                <span className="text-white">Weight:</span>
                <span className="text-2xl text-white font-secular-one">
                  {pokemon.weight / 10} kg
                </span>
              </div>
              <div className="h-fit w-fit bg-green-800 p-4 sm:-rotate-12 flex flex-row items-center justify-center gap-2 shadow-2xl -mt-4 mb-4">
                <span className="text-white font-secular-one">Abilities:</span>
                {/* {pokemon.abilities.map((item, index) => (
                  <span
                    key={index}
                    className="text-sm text-white font-secular-one"
                  >
                    {item.ability.name}
                  </span>
                ))} */}

                <span className="text-sm text-white font-secular-one">
                  {pokemon.abilities
                    .map((item) => item.ability.name)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="h-fit w-fit bg-yellow-800 p-4 -mt-28 sm:-mt-12 sm:-rotate-6 flex flex-col items-center justify-center gap-2 shadow-2xl">
                <span className="text-white">Stats:</span>
                {pokemon.stats.map((item, index) => (
                  <span
                    key={index}
                    className="text-sm text-white font-secular-one text-center"
                  >
                    {item.stat.name}: {item.base_stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <h1>{pokemon.name}</h1>
      <p></p>
      <img src={pokemon.image} /> */}
      </div>
    </>
  );
}
