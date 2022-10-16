import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Dashboard from "./dashboard";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please Install Metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Musicen</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      {isWalletConnected ? (
        <Dashboard />
      ) : (
        <div className="relative font-body overflow-hidden">
          <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

          <div className="w-[705px] h-[405px] absolute left-[1053px] top-[700px] bg-blue-800/50 blur-[150px] rounded-full md:left-[560px] md:top-[650px] sm:top-[450px] sm:left-[150px]"></div>

          <section className="max-w-[1240px] h-screen my-0 mx-auto grid grid-cols-2 items-center justify-center gap-3 md:order-second md:grid-cols-1 ">
            <div className="flex flex-col p-1 md:items-center md:justify-center sm:p-2">
              <div className="flex gap-2 items-center md:justify-center">
                <h1 className="font-body text-8xl md:text-5xl md:text-center font-bold my-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 leading-[120px] md:leading-normal sm:text-[30px]">
                  Musicen
                </h1>
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-[120px] h-[120px] md:w-[48px] md:h-[48px]"
                />
              </div>
              <p className="text-[#979797] text-[35px] md:text-center md:text-base my-1">
                Musicen is a Decentralized Music Web App built with Solidity,
                Hardhat, NextJS, Arweave + Bundlr Client, and Tailwind CSS.
              </p>
              <button
                onClick={connectWallet}
                className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
              >
                Connect Wallet
              </button>
            </div>

            <div className="md:hidden  flex items-center justify-center ">
              <div className="flex items-center justify-center md:w-full md:h-full">
                <img src="/Mockup.png" alt="mockup" className="md:h-full" />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
