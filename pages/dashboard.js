import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";

import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/truncAddress";


const mainURL = `https://arweave.net/`;

const FETCH_SONGS = gql`
  query songs($orderBy: String!, $orderDirection: String!) {
    songs(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      songcover
      song
      songName
      genre
      songArtist
      createdAt
      releaseDate
    }
  }
`;

const Dashboard = () => {
  const [songs, setSongs] = useState([]);

  const clientApollo = useApolloClient();

  const getSongs = async () => {
    clientApollo
      .query({
        query: FETCH_SONGS,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data);
        setSongs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSongs();
  }, [songs]);

  console.log(songs);

  return (
    <div className="font-body overflow-hidden">
      <Head>
        <title>Musicen 🎵</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>
      <div>
        <div className="flex gap-5 max-w-[1240px] mx-auto my-20 items-center justify-center ">
          <h1 className="font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
            Musicen
          </h1>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        </div>
        <div className="max-w-[1240px] mx-auto my-0 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-3 sm:p-5">
          {songs?.songs?.length > 0 &&
            songs.songs.map((data) => (
              <div
                key={data.id}
                className="border border-solid border-sky-800 rounded-xl p-3 sm:p-5"
              >
                <div className="w-full h-[320px] rounded-lg relative">
                  <img
                    src={mainURL + data.songcover}
                    alt={data.songName}
                    className="w-full h-full rounded-lg"
                  />
                  <div className="flex items-center justify-center">
                    <p className="absolute w-auto text-center bottom-2 left-auto right-auto backdrop-blur-sm bg-black/50 border-solid border-2 border-sky-800 p-4 rounded-full  ">
                      <span className="font-semibold text-white">
                        {data.genre}
                      </span>
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl my-2">{data.songName}</h3>
                <h4 className="text-slate-500">
                  Artist:{" "}
                  <span className="font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800">
                    {truncateEthAddress(data.songArtist)}
                  </span>
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
