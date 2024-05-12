# Assignment 1

## Description
The is a Node.js module that allows users to manage their playlists by performing various operations such as searching for songs, creating playlists, editing playlist names, viewing playlist contents, adding and removing songs from playlists, and receiving song recommendations based on playlist content.

## Set up

To use this module in your Node.js project, follow these steps:

1. Install Node JS if it's not already installed
2. Create a new file `app.js`
3. In app.js, import the node module with the correct file path
    ```js
    const library = require('./Caden_PlaylistManager.js');
    ```
4. Type in the following line of codes in app.js
    ```js
    library.run();
    ```
5. Run `node app.js` on your terminal and ensure you're in the right directory

## Functions
Once the module is installed, you can run the following functions:

+ **searchSongs(query)**
This function allows the user to search for songs in the database

+ **createPlaylist(playlistName)**
This function allows the user to create a playlist with a name of their choosing

+ **editPlaylist(oldname, newname)**
This function allows the user to edit the name of their playlist

+ **viewPlaylist(playlistName)**
This function allows the user to view the songs in their playlist

+ **addSongsToPlaylist(songName)**
This function allows the user to add a song to their playlist

+ **removeSongsFromPlaylist(songName)**
This function will remove a song from their playlist by specifying the song name

+ **recommendSongs()**
This function provides users with song recommendations from the same genre as the songs in their playlist