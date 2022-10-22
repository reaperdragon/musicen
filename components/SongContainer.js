import { CloseSquare } from "iconsax-react";
import React from "react";
import { truncateEthAddress } from "../utils/truncAddress";
import moment from "moment";
import Head from "next/head";

const mainURL = `https://arweave.net/`;

const SongContainer = ({ toggle, selectedSong }) => {
  return (
    <div
      className="w-full h-full  backdrop-blur-sm bg-black/50 flex items-center justify-center font-body "
      onClick={toggle}
    >
      <Head>
        <title>{selectedSong.songName} 🎵</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <section className="grid grid-cols-1 max-w-[850px] mx-auto my-0 sm:grid-cols-1  gap-2  p-6 bg-gradient-to-r from-sky-500 to-blue-800 rounded md:m-8">
        <div className="w-full sm:h-[350px] h-[450px] ssm:h-[250px]">
          <img
            src={mainURL + selectedSong.image}
            alt="mockup"
            className="w-full h-full rounded"
          />
        </div>
        <div className="relative">
          <div
            className="absolute sm:top-[-410px] sm:right-[-55px] ssm:top-[-310px] right-[-50px] top-[-510px] z-[999] backdrop-blur-sm bg-white/30 p-3 rounded-lg cursor-pointer "
            onClick={toggle}
          >
            <CloseSquare size="32" color="#d9e3f0" />
          </div>
          <h2 className="text-xl font-semibold ssm:text-base">
            {selectedSong.songName}
          </h2>
          <h3 className="text-lg  my-2 sm:my-1 ssm:text-base">
            Artist:{" "}
            <span className="">{truncateEthAddress(selectedSong.artist)}</span>
          </h3>
          <h4 className="my-2 sm:my-1">Genre: {selectedSong.genre}</h4>
          <p className="my-2 sm:my-1">
            Release Date: {moment(selectedSong.releaseDate).format("MMM YYYY")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SongContainer;
