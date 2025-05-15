import Head from "next/head";
import { useState } from "react";
import GraphCard from "../components/GraphCard";

export default function Home({ bitcoinPrice, entropy, imeActivation }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <Head>
        <title>IME Live Observatory</title>
      </Head>
      <main className={\`flex flex-col items-center justify-center min-h-screen p-4 font-mono \${darkMode ? "bg-black text-white" : "bg-white text-black"}\`}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 px-4 py-1 border rounded text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <h1 className="text-3xl mb-2 mt-4">🧠 IME Live Observatory</h1>
        <div className="text-xl mb-4 text-yellow-500 font-semibold">
          💰 Bitcoin Price: ${bitcoinPrice > 0 ? bitcoinPrice.toFixed(2) : 'Unavailable'}
        </div>
        <GraphCard />
        <p className="mt-6 text-sm text-gray-400">Powered by I.M.E. Theory</p>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let bitcoinPrice = 0;

  try {
    const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
    const data = await res.json();
    bitcoinPrice = parseFloat(data.bpi.USD.rate.replace(',', ''));
  } catch (error) {
    console.error("Failed to fetch Bitcoin price:", error);
    bitcoinPrice = -1;
  }

  const entropy = 3.03;
  const imeActivation = -3.0311;

  return {
    props: {
      bitcoinPrice,
      entropy,
      imeActivation,
    },
  };
}