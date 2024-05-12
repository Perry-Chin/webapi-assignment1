# Assignment 1 (Playlist Module)

## Description
The is a Node.js module that allows users to manage their playlists by performing various operations such as searching for songs, creating playlists, editing playlist names, viewing playlist contents, adding and removing songs from playlists, and receiving song recommendations based on playlist content.

## Usage

To use this module in your Node.js project, follow these steps:

1. Install Node.js if you don't have it already, download and install Node.js from https://nodejs.org/.
2. Save the `Caden_PlaylistManager.js` file in your project directory.
3. Create a new file named `app.js`
4. In `app.js`, import the module using the correct file path
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
This function allows the user to search for songs by artist or title

+ **playlist.createPlaylist(playlistName)**
This function allows the user to create a playlist with the specified name

+ **module.editPlaylist(oldname, newname)**
This function allows the user to edit the name of an existing playlist

+ **module.viewPlaylist(playlistName)**
This function allows the user to view the songs in their playlist

+ **module.addSongsToPlaylist(songName)**
This function allows the user to add a song to an existing playlist

+ **module.removeSongsFromPlaylist(songName)**
This function will remove a song from their playlist

+ **module.recommendSongs(playlistName)**
This function provides users with song recommendations from the same genre as the songs in their playlist

## Example

```js
    const module = require('./Caden_PlaylistManager.js');

    // Create a new playlist
    module.createPlaylist("MyPlaylist");

    // Add a song to the playlist
    module.addSongsToPlaylist("MyPlaylist", "Enemy");

    // View the contents of the playlist
    module.viewPlaylist("MyPlaylist");

    // Remove a song from the playlist
    module.removeSongsFromPlaylist("MyPlaylist", "Enemy");

    // Edit the playlist name
    module.editPlaylist("MyPlaylist", "NewPlaylist");

    // Get song recommendations based on the playlist
    module.recommendSongs("NewPlaylist");

 ```