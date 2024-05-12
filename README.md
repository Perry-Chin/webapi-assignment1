# Assignment 1 (Playlist Module)

## Description
The is a Node.js module that allows users to manage their playlists by performing various operations such as searching for songs, creating playlists, editing playlist names, viewing playlist contents, adding and removing songs from playlists, and receiving song recommendations based on playlist content.

## Usage

To use this module in your Node.js project, follow these steps:

1. Install Node.js if you don't have it already, download and install Node.js from [https://nodejs.org/].
2. Save the `Caden_PlaylistManager.js` file in your project directory.
3. Create a new file `app.js`
4. In `app.js`, import the node module with the correct file path
    ```js
    const playlistManager = require('./Caden_PlaylistManager.js');
    ```

## Functions
Once the module is installed, you can run the following functions:

+ **playlistManager.searchSongs(query)**
This function allows the user to search for songs by artist or title

+ **playlistManager.createPlaylist(playlistName)**
This function allows the user to create a playlist with the specified name

+ **playlistManager.editPlaylist(oldname, newname)**
This function allows the user to edit the name of an existing playlist

+ **playlistManager.viewPlaylist(playlistName)**
This function allows the user to view the songs in their playlist

+ **playlistManager.addSongsToPlaylist(songName)**
This function allows the user to add a song to an existing playlist

+ **playlistManager.removeSongsFromPlaylist(songName)**
This function will remove a song from their playlist

+ **playlistManager.recommendSongs(playlistName)**
This function provides users with song recommendations from the same genre as the songs in their playlist