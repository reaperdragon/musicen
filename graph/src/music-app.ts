import { UploadSong as SongUploadedEvent } from '../generated/MusicApp/MusicApp';

import { Song } from '../generated/schema';

export function handleUploadSong(event: SongUploadedEvent): void {
  let song = new Song(event.params.songId.toString());
  song.songcover = event.params.songcover;
  song.song = event.params.song;
  song.songName = event.params.songName;
  song.songArtist = event.params.songArtist;
  song.genre = event.params.genre;
  song.releaseDate = event.params.releaseDate;
  song.createdAt = event.block.timestamp;
  song.save();
}