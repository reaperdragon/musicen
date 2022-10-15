// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
* @author Aakrut
* @title Music App
*/
contract MusicApp {
    // events

    /* 
    * @title UploadSong
    * @dev log upload song
    * @param song id,song cover image, song, song name, artist, genre, release Date
    */
    event UploadSong(
        uint256 songId,
        string songcover,
        string song,
        string songName,
        address songArtist,
        string genre,
        string releaseDate
    );

    /* 
    * @title Update Song
    * @dev log update song
    * @param song id,song cover image, song, song name, artist, genre, release Date
    */
     event UpdateSong(
        uint256 songId,
        string songcover,
        string song,
        string songName,
        address songArtist,
        string genre,
        string releaseDate
    );

    // state vars
    string private name;
    address private owner;

    using Counters for Counters.Counter;
    Counters.Counter private _songIds;

    // Song Structure
    struct Song {
        uint256 songId;
        string songcover;
        string song;
        string songName;
        address songArtist;
        string genre;
        string releaseDate;
    }

    // 1 -> 1 , Lose Yourself, Eminem, Hip/Hop, 2002
    mapping(uint256 => Song) private idToSong;

    constructor(string memory _name) {
        console.log("Music App Name: ",_name);
        owner = msg.sender;
        name = _name;
    }

    /* 
    * @title uploadsong
    * @dev upload song
    * @param song cover image, song, song name, genre, release Date
    */
    function uploadsong(string memory _songcover,string memory _song, string memory _songname, string memory _genre, string memory _releaseDate) public {
        require(bytes(_songcover).length>0,"Please Provide Song Cover");
        require(bytes(_songname).length > 0, "Please Provide Name for Song" );
        require(bytes(_song).length > 0, "Please Provide Song");
        require(bytes(_genre).length > 0,"Please Provide Genre For Song");
        require(bytes(_releaseDate).length > 0, "Please Provide Release Date For Song");
        // incrment song id by 1
        _songIds.increment();

        // current song id
        uint256 currentSongId = _songIds.current();
    
        Song storage song = idToSong[currentSongId];
        song.songId = currentSongId;
        song.songcover = _songcover;
        song.song = _song;
        song.songName = _songname;
        song.songArtist = msg.sender;
        song.genre = _genre;
        song.releaseDate = _releaseDate;

        // emit an event
        emit UploadSong(currentSongId,_songcover , _song, _songname, msg.sender, _genre, _releaseDate);
    }

    /* 
    * @title updatesong
    * @dev update song
    * @notice only owner of the song can update song
    * @param song id, song cover image, song, song name, genre, release Date
    */
    function updatesong(uint256 _id, string memory _songcover, string memory _song, string memory _songname, string memory _genre, string memory _releaseDate) public onlyOwner(_id) {
        require(_id > 0, "Sorry This Song Does not Exists");
        require(bytes(_songname).length > 0, "Please Provide Name for Song" );
        require(bytes(_song).length > 0, "Please Provide Song");
        require(bytes(_genre).length > 0,"Please Provide Genre For Song");
        require(bytes(_releaseDate).length > 0, "Please Provide Release Date For Song");

        Song storage song = idToSong[_id];
        song.songcover = _songcover;
        song.song = _song;
        song.songName = _songname;
        song.genre = _genre;
        song.releaseDate = _releaseDate;

        emit UpdateSong(_id,_songcover,_song, _songname, msg.sender, _genre, _releaseDate);
    }

   /* 
    * @title getSong
    * @dev get song by id
    * @param song id
    */
    function getSong(uint256 _id) public view returns (Song memory) {
        return idToSong[_id];
    }

    /* 
    * @title getSongs
    * @dev get all songs
    */
    function getSongs() public view returns(Song[] memory) {
        // get the total songs from id
        uint256 totalSongs = _songIds.current();

        // create fixed size array
        Song[] memory songs = new Song[](totalSongs);

        for(uint i=0; i<totalSongs; i++) {
             uint currentId = i + 1;
            Song storage currentItem = idToSong[currentId];
            songs[i] = currentItem;
        }
        return songs;
    }
    
    /* 
    * @title onlyOwner
    * @dev check for validation if the sender is not the equal to the artist then reverts
    * @param song id
    */
    modifier onlyOwner(uint256 _id) {
        require(msg.sender == idToSong[_id].songArtist, "Please Update Your Own Song Not Others!");
        _;
    }

}
