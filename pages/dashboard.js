import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { AudioPlayer, SongContainer } from "../components";
import { truncateEthAddress } from "../utils/truncAddress";

const mainURL = `https://arweave.net/`;

const FETCH_SONGS = gql`
  query songs($orderBy: String!, $orderDirection: String!) {
    songs(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      songcover
      song
      songName
      songArtist
      genre
      createdAt
      releaseDate
    }
  }
`;

const Dashboard = () => {
  const [songs, setSongs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [currentSong, setCurrentSong] = useState({
    id: "",
    song: "",
    image: "",
    songName: "",
  });

  const [selectedSong, setSelectedSong] = useState({
    id: "",
    song: "",
    image: "",
    songName: "",
    artist: "",
    genre: "",
    releaseDate: "",
  });

  const [playing, setPlaying] = useState(false);

  const myRef = useRef(null);

  const startAudio = () => {
    console.log(myRef.current);
    myRef?.current?.play();
    setPlaying(true);
  };

  const pauseAudio = () => {
    console.log("here");
    myRef?.current?.pause();
    setPlaying(false);
  };

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

  const handlePlay = () => {
    if (playing) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    getSongs();
  }, [songs]);

  console.log(currentSong);

  return (
    <div className="font-body overflow-hidden relative">
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
        <div className="max-w-[1240px] mx-auto my-0 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-3 sm:p-5 gap-2 sm:mb-[50px]">
          {songs?.songs?.length > 0 &&
            songs.songs.map((data) => (
              <div
                key={data.id}
                className="border border-solid border-sky-800 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600/60 hover:border-none transition duration-250 ease-in-out  hover:drop-shadow-xl hover:-translate-y-1 relative"
                onClick={() => {
                  setCurrentSong({
                    id: data.id,
                    song: data.song,
                    image: data.songcover,
                    songName: data.songName,
                  });
                  handlePlay();
                }}
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

                <div className="absolute opacity-0 backdrop-blur-sm bg-black/50 hover:opacity-100 w-full h-full left-0 top-0 p-6">
                  <h2 className="font-bold text-3xl my-2"> {data.songName}</h2>
                  <h4 className="font-semibold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 my-2">
                    Artist: {truncateEthAddress(data.songArtist)}
                  </h4>
                  <button
                    className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:translate-y-1 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
                    onClick={() => {
                      setSelectedSong({
                        id: data.id,
                        song: data.song,
                        image: data.songcover,
                        songName: data.songName,
                        artist: data.songArtist,
                        genre: data.genre,
                        releaseDate: data.releaseDate,
                      });
                      setIsOpen(!isOpen);
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isOpen ? (
        <div className="fixed h-full w-full z-[100] top-0 left-0">
          <SongContainer toggle={toggle} selectedSong={selectedSong} />
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 w-full bg-black/40 p-2 backdrop-blur-md ">
        {currentSong && <AudioPlayer currentSong={currentSong} />}
      </div>
    </div>
  );
};

export default Dashboard;
