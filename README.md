# Assignment 1 (Playlist Module)

<details>
<summary>Table of contents</summary>

## Table of contents

- [Description](#description)
- [Usage](#usage)
- [Functions](#functions)
- [Example](#example)

</details>

## [Description](#assignment-1-(playlist-module))

The is a Node.js module that allows users to manage their playlists by performing various operations such as searching for songs, creating playlists, editing playlist names, viewing playlist contents, adding and removing songs from playlists, and receiving song recommendations based on playlist content.

## [Usage](#assignment-1-(playlist-module))

To use this module in your Node.js project, follow these steps:

1. Install Node.js if you don't have it already, download and install Node.js from https://nodejs.org/.
2. Save the `Caden_PlaylistManager.js` file in your project directory.
3. Create a new file named `app.js`
4. In `app.js`, insert the code below to import the module:
    ```js
    const playlist = require('./Caden_PlaylistManager.js');
    ```
5. To execute the module and any of the functions, run the following command in your terminal:
    ```sh
    node app.js
    ```

## [Functions](#assignment-1-(playlist-module))
Once the module is installed, you can run the following functions:

+ **searchSongs(query)**     
    This function allows the user to search for songs by artist or title. The search query is case-insensitive.

+ **createPlaylist(playlistName)**     
    This function allows the user to create a playlist with the specified name. 

+ **editPlaylist(oldname, newname)**     
    This function allows the user to edit the name of an existing playlist.

+ **viewPlaylist(playlistName)**     
    This function allows the user to view the songs in their playlist.

+ **addSongsToPlaylist(playlistName, songName, artist)**     
    This function allows the user to add a song to an existing playlist.

+ **removeSongsFromPlaylist(playlistName, songName, artist)**     
    This function will remove a song from their playlist.

+ **deletePlaylist(playlistName)**     
    This function allows the user to delete an existing playlist.

+ **recommendSongs(playlistName)**     
    This function provides users with song recommendations from the same genre as the songs in their playlist.

## [Example](#assignment-1-(playlist-module))

Below is an example of what the `app.js` file should look like

```js
// In app.js

const playlist = require('./Caden_PlaylistManager.js');

// Search for songs with the same name
console.log(playlist.searchSongs("Enemy"));

// Create a new playlist
console.log(playlist.createPlaylist("MyPlaylist"));

// Add a song to the playlist
console.log(playlist.addSongToPlaylist("MyPlaylist", "Enemy", 'Imagine Dragons'));

// View the contents of the playlist
console.log(playlist.viewPlaylist("MyPlaylist"));

// Edit the playlist name
console.log(playlist.editPlaylist("MyPlaylist", "NewPlaylist"));

// Get song recommendations based on the playlist
console.log(playlist.recommendSongs("NewPlaylist"));

// Remove a song from the playlist
console.log(playlist.removeSongFromPlaylist("NewPlaylist", "Enemy", 'Imagine Dragons'));

// Delete the playlist
console.log(playlist.deletePlaylist("NewPlaylist"));
 ```