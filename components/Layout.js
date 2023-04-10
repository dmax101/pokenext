import Navbar from "./Navbar";
import Footer from "./Footer";

import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>PokeNext</title>
        <meta name="description" content="Pokedex Next.js" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="p-12 h-full bg-gradient-to-b from-yellow-100 to-yellow-200 text-gray-600 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
