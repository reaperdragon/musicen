import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
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
        <link rel="icon" href="/logo.png" />
      </Head>
      {isWalletConnected ? (
        <Dashboard />
      ) : (
        <div className="relative font-body">
          <section className="max-w-[1240px] h-screen my-0 mx-auto grid grid-cols-2 items-center justify-center gap-3 md:order-second md:grid-cols-1">
            <div className="flex flex-col p-1 md:items-center md:justify-center">
              <div className="flex gap-2 items-center md:justify-center">
                <h1 className="font-body text-8xl md:text-5xl md:text-center">
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

            <div className="md:order-first ">
              <div className=" flex  items-center justify-center ">
                <img src="/Mockup.png" alt="mockup" className="" />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
