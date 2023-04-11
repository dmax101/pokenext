import Link from "next/link";

import Card from "../components/Card";

export async function getStaticProps() {
  const maxPokemons = 1010;
  const api = "https://pokeapi.co/api/v2/pokemon";

  const res = await fetch(`${api}?limit=${maxPokemons}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold w-full text-center mb-8">Pokédex</h1>
        <div className="flex flex-row flex-wrap gap-2 w-fit justify-around">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon}></Card>
          ))}
        </div>
      </div>
    </>
  );
}
