import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
];

export default function Navbar() {
  return (
    <nav className="bg-yellow-200 w-full justify-between p-4 flex flex-row text-gray-500 border-b-4 border-b-orange-300">
      <div className="flex flex-row gap-2 w-fit items-center">
        <Image
          className="animate-spin-slow"
          src="/images/pokeball.png"
          width={30}
          height={30}
          alt="Pokeball"
        />
        <h1 className="font-bold text-3xl">
          <span className="text-black">Poke</span>
          <span className="text-red-500">Next</span>
        </h1>
      </div>
      <div className="w-fit">
        <ul className="flex flex-row gap-2 items-center">
          {sections.map((section, index) => (
            <li key={index}>
              <Link
                className="border-b-2 border-b-orange-300 hover:border-b-4 hover:border-b-green-500 hover:text-emerald-500 cursor-pointer p-4"
                href={section.url}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
