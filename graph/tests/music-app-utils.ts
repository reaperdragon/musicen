import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { UpdateSong, UploadSong } from "../generated/MusicApp/MusicApp"

export function createUpdateSongEvent(
  songId: BigInt,
  songcover: string,
  song: string,
  songName: string,
  songArtist: Address,
  genre: string,
  releaseDate: string
): UpdateSong {
  let updateSongEvent = changetype<UpdateSong>(newMockEvent())

  updateSongEvent.parameters = new Array()

  updateSongEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam("songcover", ethereum.Value.fromString(songcover))
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam("song", ethereum.Value.fromString(song))
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam("songName", ethereum.Value.fromString(songName))
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam(
      "songArtist",
      ethereum.Value.fromAddress(songArtist)
    )
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam("genre", ethereum.Value.fromString(genre))
  )
  updateSongEvent.parameters.push(
    new ethereum.EventParam(
      "releaseDate",
      ethereum.Value.fromString(releaseDate)
    )
  )

  return updateSongEvent
}

export function createUploadSongEvent(
  songId: BigInt,
  songcover: string,
  song: string,
  songName: string,
  songArtist: Address,
  genre: string,
  releaseDate: string
): UploadSong {
  let uploadSongEvent = changetype<UploadSong>(newMockEvent())

  uploadSongEvent.parameters = new Array()

  uploadSongEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam("songcover", ethereum.Value.fromString(songcover))
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam("song", ethereum.Value.fromString(song))
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam("songName", ethereum.Value.fromString(songName))
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam(
      "songArtist",
      ethereum.Value.fromAddress(songArtist)
    )
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam("genre", ethereum.Value.fromString(genre))
  )
  uploadSongEvent.parameters.push(
    new ethereum.EventParam(
      "releaseDate",
      ethereum.Value.fromString(releaseDate)
    )
  )

  return uploadSongEvent
}
