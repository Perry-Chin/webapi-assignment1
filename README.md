# Assignment 1 (Playlist Module)

## Description
The is a Node.js module that allows users to manage their playlists by performing various operations such as searching for songs, creating playlists, editing playlist names, viewing playlist contents, adding and removing songs from playlists, and receiving song recommendations based on playlist content.

## Usage

To use this module in your Node.js project, follow these steps:

1. Install Node.js if you don't have it already, download and install Node.js from https://nodejs.org/.
2. Save the `Caden_PlaylistManager.js` file in your project directory.
3. Create a new file named `app.js`
4. In `app.js`, insert the code below to import the module using the correct file path
    ```js
    const playlist = require('./Caden_PlaylistManager.js');
    ```
5. To execute the module and any of the functions, run the following command in your terminal:
    ```sh
    node app.js
    ```

## Functions
Once the module is installed, you can run the following functions:

+ **playlist.searchSongs(query)**     
    This function allows the user to search for songs by artist or title. The search query is not case-sensitive and can take any form.

+ **playlist.createPlaylist(playlistName)**     
    This function allows the user to create a playlist with the specified name. If the playlist name is already in use or is an empty string, an error will be returned.

+ **playlist.editPlaylist(oldname, newname)**     
    This function allows the user to edit the name of an existing playlist. If the new name is empty or already exists (except for the old name), an error will be returned.

+ **playlist.viewPlaylist(playlistName)**     
    This function allows the user to view the songs in their playlist.

+ **playlist.addSongsToPlaylist(songName, artist)**     
    This function allows the user to add a song to an existing playlist. The song name and artist parameters are case-sensitive.

+ **playlist.removeSongsFromPlaylist(songName, artist)**     
    This function will remove a song from their playlist. The song name and artist parameters are case-sensitive.

+ **playlist.recommendSongs(playlistName)**     
    This function provides users with song recommendations from the same genre as the songs in their playlist.

## Example

Below is an example of what the `app.js` file should look like

```js
// In app.js

const playlist = require('./Caden_PlaylistManager.js');

// Search for songs with the same name
playlist.searchSongs("Enemy");

// Create a new playlist
playlist.createPlaylist("MyPlaylist");

// Add a song to the playlist
playlist.addSongToPlaylist("MyPlaylist", "Enemy", 'Imagine Dragons');

// View the contents of the playlist
playlist.viewPlaylist("MyPlaylist");

// Edit the playlist name
playlist.editPlaylist("MyPlaylist", "NewPlaylist");

// Get song recommendations based on the playlist
playlist.recommendSongs("NewPlaylist");

// Remove a song from the playlist
playlist.removeSongFromPlaylist("NewPlaylist", "Enemy", 'Imagine Dragons');
 ```