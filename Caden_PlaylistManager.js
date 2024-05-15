// Module to manage your playlist

const songs = [
    {
        title: 'Enemy',
        artist: 'Imagine Dragons',
        genre: ['Alternative', 'Rock'],
        year: 2021
    },
    {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        genre: ['Pop'],
        year: 2017
    },
    {
        title: 'Heathens',
        artist: 'twenty one pilots',
        genre: ['Pop', 'Rock'],
        year: 2016
    },
    {
        title: 'Hymn for the Weekend',
        artist: 'Coldplay',
        genre: ['Alternative', 'Indie'],
        year: 2015
    }
]

const playlists = [];

// Helper function to find a playlist
function findPlaylist(playlistName) {
    return playlists.find(playlist => playlist.name === playlistName);
}

// Helper function for error messages
function playlistError(playlistName, message) {
    console.log(`Error: Playlist with name '${playlistName}' ${message}.`);
    return false;
}

// Create a mapping of genres to songs
const genreToSongsMap = new Map();
songs.forEach(song => {
    song.genre.forEach(genre => {
        // Check if the genre exists
        if (!genreToSongsMap.has(genre)) {
            genreToSongsMap.set(genre, []);
        }
        // Push the current song to the array associated with the genre
        genreToSongsMap.get(genre).push(song);
    });
});

module.exports = {

    /**
     * Function to search for songs by the artist name or song title.
     * The search query is not case-sensitive and can take any form.
     * @param {string} query - The search query for song title or artist.
     * @returns {Array} An array of songs matching the search query.
     */
    searchSongs(query) {

        const results = songs.filter(song => {
            // Convert to lowercase for case-insensitive search
            const lowerCaseQuery = query.toLowerCase();
            const lowerCaseTitle = song.title.toLowerCase();
            const lowerCaseArtist = song.artist.toLowerCase();

            // Check if query is present in title or artist
            return lowerCaseTitle.includes(lowerCaseQuery) || 
                   lowerCaseArtist.includes(lowerCaseQuery);
        });

        // Check if no songs are found matching the search query
        if (results.length === 0) {
            console.log("No songs found matching your search.");
            return false;
        } 
        // If songs are found matching the search query
        else {
            console.log("Search Results:");
            results.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return results; // Return the array of found songs
        }
    },

    /**
     * Function to create a new playlist.
     * @param {string} playlistName - The name of the new playlist.
     * @returns {boolean} True if the playlist is created successfully, false otherwise.
     */
    createPlaylist(playlistName) {

        // Check if playlist name is empty
        if (!playlistName.trim()) {
            return playlistError(playlistName, "is not allowed"); 
        }

        // Check if playlist already exist
        if (findPlaylist(playlistName)) {
            return playlistError(playlistName, "already exists"); 
        }
        
        // Create playlist
        playlists.push({ name: playlistName, songs: [] });
        console.log(`Playlist '${playlistName}' created.`);
        return true;
    },

    /**
     * Edit the name of a playlist.
     * @param {string} oldName - The current name of the playlist.
     * @param {string} newName - The new name for the playlist.
     * @returns {boolean} True if the playlist name is edited successfully, false otherwise.
     */
    editPlaylist(oldName, newName) {

        // Check if playlist name is empty
        if (!newName.trim()) {
            return playlistError(newName, "is not allowed"); 
        }
        
        // Check if playlist does not exist
        let playlist = findPlaylist(oldName);
        if (!playlist) {
            return playlistError(oldName, "not found"); 
        }
        
        // Check if the new playlist name already exists and is not the old name
        if (playlists.some(playlist => playlist.name === newName && playlist.name !== oldName)) {
            console.log(`Error: Playlist with name '${newName}' already exists.`);
            return false;
        }

        //Update playlist name with the new name
        playlist.name = newName;
        console.log(`Playlist renamed from '${oldName}' to '${newName}'.`);
        return true;
    },

    /**
     * Function to view all songs in a selected playlist with title and artist.
     * @param {string} playlistName - The name of the playlist to view.
     * @returns {boolean} True if songs are displayed successfully, false if the playlist is empty or not found.
     */
    viewPlaylist(playlistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }
        
        // Check if playlist contains songs
        if (playlist.songs.length === 0) {
            console.log("Playlist is empty.");
            return false;
        } 

        // Show all songs in the playlist with title and artist
        else {
            console.log(`Songs in ${playlistName}:`);
            playlist.songs.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return true;
        }
    },

    /**
     * Function to add a song to a selected playlist.
     * @param {string} playlistName - The name of the playlist to which the song will be added.
     * @param {string} songTitle - The title of the song to add.
     * @param {string} artistName - The name of the artist of the song.
     * @returns {boolean} True if the song is added successfully, false otherwise.
     */
    addSongToPlaylist(playlistName, songTitle, artistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }

        // Check if song and artist exist
        let songToAdd = songs.find(song => song.title === songTitle && song.artist === artistName);
        if (!songToAdd) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' not found.`);
            return false;
        }
        
        // Check if the song and artist already exists in the playlist
        if (playlist.songs.some(song => song.title === songTitle && song.artist === artistName)) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' already exists in playlist '${playlistName}'.`);
            return false;
        }

        // Add song to playlist
        playlist.songs.push(songToAdd);
        console.log(`'${songTitle}' by '${artistName}' added to playlist, '${playlistName}'.`);
        return true;
    },

    /**
     * Function to remove a song from a selected playlist.
     * @param {string} playlistName - The name of the playlist from which the song will be removed.
     * @param {string} songTitle - The title of the song to remove.
     * @param {string} artistName - The name of the artist of the song.
     * @returns {boolean} True if the song is removed successfully, false otherwise.
     */
    removeSongFromPlaylist(playlistName, songTitle, artistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }

        // Check if song exists in playlist
        const songIndex = playlist.songs.findIndex(song => song.title === songTitle && song.artist === artistName);
        if (songIndex === -1) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' not found in playlist '${playlistName}'.`);
            return false;
        }

        // Remove the song from the playlist
        playlist.songs.splice(songIndex, 1); 
        console.log(`Song '${songTitle}' by '${artistName}' removed from playlist '${playlistName}'.`);
        return true;
    }, 

    /**
     * Function to delete a playlist and all of its contents.
     * @param {string} playlistName - The name of the playlist to delete.
     * @returns {boolean} True if the playlist is deleted successfully, false otherwise.
     */
    deletePlaylist(playlistName) {
        
        // Find the playlist to delete
        const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName);

        // Check if playlist does not exist
        if (playlistIndex === -1) {
            return playlistError(playlistName, "not found");
        }

        // Remove the playlist from the playlists array
        playlists.splice(playlistIndex, 1);
        console.log(`Playlist '${playlistName}' deleted.`);
        return true;
    },

    /**
     * Function to recommend similar songs from the same genre as the songs in a playlist.
     * @param {string} playlistName - The name of the playlist for which recommendations will be made.
     * @returns {boolean} True if recommendations are displayed successfully, false if the playlist is not found or no recommendations are available.
     */
    recommendSongs(playlistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }

        // Get all genres from songs in the playlist
        const playlistGenres = new Set(); 
        playlist.songs.forEach(song => {
            song.genre.forEach(genre => playlistGenres.add(genre));
        });

        // Array to store recommendations
        const recommendations = [];

        // Find songs with matching genres
        playlistGenres.forEach(genre => {
            const genreSongs = genreToSongsMap.get(genre);
            // Check if there are songs available for the current genre
            if (genreSongs) {
                genreSongs.forEach(song => {
                    // Exclude songs already in the playlist
                    if (!playlist.songs.some(playlistSong => playlistSong.title === song.title)) {
                        recommendations.push(song); // Add the song to recommendations
                    }
                });
            }
        });

        // No songs matching the genre
        if (recommendations.length === 0) {
            console.log("No recommendations found.");
            return false;
        } 
        // Show all songs with same as genre as songs in playlist
        else {
            console.log(`Recommendations for playlist '${playlistName}':`);
            recommendations.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return true;
        }
    }
}