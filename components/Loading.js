import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Image
          className="animate-spin"
          src="/images/pokeball.png"
          width={50}
          height={50}
          alt="Pokeball"
        />
        <span className="text-2xl text-gray-700">Carregando...</span>
      </div>
    </>
  );
}
