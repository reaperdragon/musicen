import { useApolloClient,gql } from '@apollo/client';
import Head from 'next/head';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Header, SongContainer } from '../components'
import { truncateEthAddress } from '../utils/truncAddress';

const mainURL = `https://arweave.net/`;

const Search = () => {

  const [searchFilter, setSearchFilter] = useState("");

  const [songs, setSongs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    const [selectedSong, setSelectedSong] = useState({
      id: "",
      song: "",
      image: "",
      songName: "",
      artist: "",
      genre: "",
      releaseDate: "",
    });


  const clientApollo = useApolloClient();

  const SEARCH_SONG = useMemo(
    () => gql`
      query songs(
        $orderBy: Song_orderBy
        $orderDirection: OrderDirection
        $where: Song_filter
      ) {
        songs(
          orderBy: $orderBy
          orderDirection: $orderDirection
          where: $where
        ) {
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
    `,
    []
  );

  const getSongs = useCallback(async () => {
    clientApollo
      .query({
        query: SEARCH_SONG,
        variables: {
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {
            ...(searchFilter && {
              songName_contains_nocase: searchFilter,
            }),
          },
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
  }, [SEARCH_SONG, clientApollo, searchFilter]);

  useEffect(() => {
    getSongs();
  }, [searchFilter, getSongs]);

  return (
    <div>
      <Head>
        <title>Musicen Search</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <Header />
      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <div className="flex items-center justify-center mt-8">
        <input
          placeholder="Search Video"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-5 py-3 rounded-xl border-slate-200   bg-[#272D37]/60 placeholder-slate-400 contrast-more:border-sky-400 contrast-more:placeholder-sky-500 max-w-[650px] outline-none caret-sky-700 font-body"
        />
      </div>
      {searchFilter ? (
        <div>
          <div className="max-w-[1240px] mx-auto my-0 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-3 sm:p-5 gap-2 sm:mb-[50px]">
            {songs?.songs?.length > 0 &&
              songs.songs.map((data) => (
                <div
                  key={data.id}
                  className="border border-solid border-sky-800 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600/60 hover:border-none transition duration-250 ease-in-out  hover:drop-shadow-xl hover:-translate-y-1 relative"
                 
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
                    <h2 className="font-bold text-3xl my-2">
                      {" "}
                      {data.songName}
                    </h2>
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

          {isOpen ? (
            <div className="fixed h-full w-full z-[100] top-0 left-0">
              <SongContainer toggle={toggle} selectedSong={selectedSong} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex gap-5 max-w-[1240px] mx-auto my-20 items-center justify-center ">
          <h1 className="font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 font-body">
            Search
          </h1>
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        </div>
      )}
    </div>
  );
}

export default Search;