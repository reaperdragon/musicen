import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const Upload = () => {
  
  const [songDetails, setSongDetails] = useState({
    name: "",
    genre: "Pop",
    song: "" ,
    image: "",
  });

  const [song, setSong] = useState({ song: "" });

  const [file, setFile] = useState("");

  const [songFile, setSongFile] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dataRef = useRef();

  const songDataRef = useRef();

  function triggerOnChange() {
    dataRef.current.click();
  }

  function triggerOnChangeSong() {
    songDataRef.current.click();
  }

  async function handleFileChange(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setSongDetails({ ...songDetails, image: uploadedFile });
    let reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setFile(Buffer.from(reader.result));
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }

  async function handleFileChangeSong(e) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setSongDetails({ ...songDetails, song: uploadedFile });
    setSong({...song,song: URL.createObjectURL(uploadedFile)})
    let reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setSongFile(Buffer.from(reader.result));
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }

  const handleUpload = async () => {};

  console.log(songDetails);
  console.log(songDetails.song);

  return (
    <div>
      <Head>
        <title>Upload || Musicen</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <div className="relative font-body overflow-x-hidden sm:overflow-y-auto">
        <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

        <div className="w-[705px] h-[405px] absolute left-[1053px] top-[700px] bg-blue-800/50 blur-[150px] rounded-full md:left-[560px] md:top-[650px] sm:top-[450px] sm:left-[150px]"></div>

        <section className="max-w-[1240px] h-screen my-0 mx-auto grid grid-cols-2 items-center justify-center gap-8 md:order-second md:grid-cols-1 p-6 ">
          <div
            className="w-full bg-[#272D37]/60 rounded-3xl sm:h-[350px] h-[589px] border border-solid border-sky-700 cursor-pointer"
            onClick={triggerOnChange}
          >
            <input
              id="selectImage"
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
              ref={dataRef}
            />
            {songDetails.image ? (
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={window.URL.createObjectURL(songDetails.image)}
                  alt="image"
                  ref={songDetails.image}
                  className="w-full h-full  sm:h-[350px] rounded-3xl p-2"
                />
              </div>
            ) : (
              <div className="h-full  flex justify-center items-center">
                <h2 className="text-center">
                  Please Select Cover For Yor Music
                </h2>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col font-body gap-5">
            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold ">Name</label>
              <input
                placeholder="Lose Yourself"
                className="px-5 py-3 rounded-xl
               placeholder:text-slate-400 outline-none border-none  bg-[#272D37]/60 placeholder:font-body font-body"
                value={songDetails.name}
                onChange={(e) =>
                  setSongDetails({ ...songDetails, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Genre</label>
              <select
                value={songDetails.genre}
                onChange={(e) =>
                  setSongDetails({ ...songDetails, genre: e.target.value })
                }
                name="category"
                className="px-5 py-3 rounded-xl
               placeholder:text-slate-400 outline-none border-none  bg-[#272D37]/60 placeholder:font-body font-body"
              >
                <option>Pop</option>
                <option>Hip-Hop</option>
                <option>Electronic Dance Music (EDM)</option>
                <option>Rock</option>
                <option>R&B</option>
                <option>Latin</option>
                <option>K-Pop</option>
                <option>Country</option>
                <option>Classical</option>
                <option>Metal</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Song</label>
              <input
                id="selectSong"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChangeSong}
                ref={songDataRef}
              />
              {songDetails.song !== "" ? (
                <div
                  className="w-full bg-[#272D37]/60 rounded-3xl p-8 m border border-solid border-sky-700 cursor-pointer flex items-center justify-center flex-col gap-2"
                  onClick={triggerOnChangeSong}
                >
                  <h2 className="text-center ">{songDetails.song.name}</h2>
                  <audio src={song.song} controls></audio>
                </div>
              ) : (
                <div
                  className="w-full bg-[#272D37]/60 rounded-3xl p-8 m border border-solid border-sky-700 cursor-pointer flex items-center justify-center flex-col gap-2"
                  onClick={triggerOnChangeSong}
                >
                  <p className="text-center">
                    {" "}
                    Click Here to Select Song or Click Button Below 👇🏻{" "}
                  </p>
                </div>
              )}

              <button
                type="button"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out  hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90  mt-6 gradient-background"
                onClick={triggerOnChangeSong}
              >
                Select Song
              </button>
            </div>
            <button
              type="button"
              className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out  hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90 sm:mb-10"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Upload"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Upload;
