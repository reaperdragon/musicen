import { info } from "autoprefixer";
import {
  Backward10Seconds,
  Forward10Seconds,
  Pause,
  Play,
} from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { truncateEthAddress } from "../utils/truncAddress";

const mainURL = `https://arweave.net/`;

const AudioPlayer = ({ currentSong }) => {
  console.log(currentSong);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
    currentSong,
  ]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes} : ${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value - 10);
    changeRange();
  };

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value + 10);
    changeRange();
  };

  return (
    <div className="">
      <audio
        src={mainURL + currentSong?.song}
        preload="metadata"
        ref={audioPlayer}
      >
        {" "}
      </audio>
      <div>
        <img src={mainURL + currentSong.image} alt={currentSong.songName} />
        <h4>{currentSong.songName}</h4>
      </div>
      <div>
        <button onClick={backwardTen}>
          <Backward10Seconds size="32" color="#d9e3f0" />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-blue-700 p-3 rounded-full"
        >
          {isPlaying ? (
            <Pause size="32" color="#d9e3f0" variant="Bold" />
          ) : (
            <Play size="32" color="#d9e3f0" variant="Bold" />
          )}
        </button>
        <button onClick={forwardTen}>
          <Forward10Seconds size="32" color="#d9e3f0" />
        </button>
      </div>

      <div>
        <div>{calculateTime(currentTime)}</div>

        <input
          type="range"
          defaultValue={"0"}
          ref={progressBar}
          onChange={changeRange}
        />

        <div>{duration && !isNaN(duration) && calculateTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
