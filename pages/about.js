import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center h-full">
      <h1 className="text-4xl font-bold">About</h1>
      <div className="bg-gradient-to-r from-gray-100 to-gray-300 justify-around h-96 shadow-xl rounded-2xl p-8 w-96 flex flex-col items-center border-8 border-gray-200 transition-all hover:scale-110">
        <Image
          src="/images/charizard.png"
          width={200}
          height={200}
          alt="Charizard"
        />
        <p className="mt-4 text-center text-gray-500">
          This is a Pokedex built with Next.js and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
