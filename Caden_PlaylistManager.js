// Module to manage your playlist

// An array of song objects
const songs = [
    {
        title: 'Enemy',
        artist: 'Imagine Dragons',
        genre: ['Alternative', 'Rock']
    },
    {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        genre: ['Pop']
    },
    {
        title: 'Heathens',
        artist: 'twenty one pilots',
        genre: ['Pop', 'Rock']
    },
    {
        title: 'Hymn for the Weekend',
        artist: 'Coldplay',
        genre: ['Alternative', 'Indie']
    }
]

// An array to store playlist objects
const playlists = [];

/**
 * Helper function to find a playlist by name.
 * @param {string} playlistName - Name of the playlist to find.
 * @returns {Object|undefined} The playlist object if found, otherwise undefined.
 */
function playlistExist(playlistName) {
    return playlists.find(playlist => playlist.name === playlistName);
}

/**
 * Helper function to log an error message related to playlists or songs.
 * @param {string} type - Type of error ('Playlist' or 'Song').
 * @param {string} name - Name of the error.
 * @param {string} message - Description of the error.
 * @returns {boolean} Always returns false.
 */
function errorMessage(type, name, message) {
    console.error(`Error: ${type} with name '${name}' ${message}.`);
    return false;
}

// A map to store songs organized by genre
const genreToSongsMap = new Map();
songs.forEach(song => {
    song.genre.forEach(genre => {
        if (!genreToSongsMap.has(genre)) {
            genreToSongsMap.set(genre, []);
        }
        genreToSongsMap.get(genre).push(song);
    });
});

module.exports = {

    /**
     * Function to search for songs by the artist or title.
     * @param {string} query - Search query for song title or artist (Case-insensitive).
     * @returns {boolean} True if songs are found, false otherwise.
     */
    searchSongs(query) {

        const results = songs.filter(song => {
            const lowerCaseQuery = query.toLowerCase();
            const lowerCaseTitle = song.title.toLowerCase();
            const lowerCaseArtist = song.artist.toLowerCase();

            return lowerCaseTitle.includes(lowerCaseQuery) || 
                   lowerCaseArtist.includes(lowerCaseQuery);
        });

        if (results.length === 0) {
            console.log("No songs found matching your search.");
            return false;
        } 
        else {
            console.log("Search Results:");
            results.forEach(song => console.log(`- ${song.title} by ${song.artist}`));
            return true;
        }
    },

    /**
     * Function to create a new playlist.
     * @param {string} playlistName - Name of the new playlist.
     * @returns {boolean} True if playlist is created, false if playlist name is invalid or already exist.
     */
    createPlaylist(playlistName) {

        if (!playlistName.trim()) {
            return errorMessage('Playlist', playlistName, "is not allowed"); 
        }

        if (playlistExist(playlistName)) {
            return errorMessage('Playlist', playlistName, "already exists"); 
        }
        else {
            playlists.push({ name: playlistName, songs: [] });
            console.log(`Playlist '${playlistName}' created.`);
            return true;
        }
    },

    /**
     * Function to edit the name of a playlist.
     * @param {string} oldName - Current name of the playlist.
     * @param {string} newName - New name for the playlist.
     * @returns {boolean} True if playlist name is edited, false if playlist name is invalid or not found.
     */
    editPlaylist(oldName, newName) {

        if (!newName.trim()) {
            return errorMessage('Playlist', newName, "is not allowed"); 
        }
        
        let playlist = playlistExist(oldName);
        if (!playlist) {
            return errorMessage('Playlist', oldName, "not found"); 
        }
        
        if (playlists.some(playlist => playlist.name === newName && playlist.name !== oldName)) {
            return errorMessage('Playlist', newName, "already exists"); 
        }
        else {
            playlist.name = newName;
            console.log(`Playlist renamed from '${oldName}' to '${newName}'.`);
            return true;
        }    
    },

    /**
     * Function to view all songs in a selected playlist with title and artist.
     * @param {string} playlistName - Name of the playlist to view.
     * @returns {boolean} True if songs are displayed successfully, false if the playlist is empty or not found.
     */
    viewPlaylist(playlistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return errorMessage('Playlist', playlistName, "not found"); 
        }
        
        if (playlist.songs.length === 0) {
            console.error("Playlist is empty.");
            return false;
        } 
        else {
            console.log(`Songs in ${playlistName}:`);
            playlist.songs.forEach(song => console.log(`- ${song.title} by ${song.artist}`));
            return true;
        }
    },

    /**
     * Function to add a song to a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to add.
     * @param {string} artistName - Artist of the song to add.
     * @returns {boolean} True if song is added, false if song or playlist not found or song already exist in playlist.
     */
    addSongToPlaylist(playlistName, songTitle, artistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return errorMessage('Playlist', playlistName, "not found"); 
        }

        let songToAdd = songs.find(song => song.title === songTitle && song.artist === artistName);
        if (!songToAdd) {
            return errorMessage('Song', `${songTitle} by ${artistName}`, "not found"); 
        }
        
        if (playlist.songs.some(song => song.title === songTitle && song.artist === artistName)) {
            return errorMessage('Song', `${songTitle} by ${artistName}`, "already exists in playlist"); 
        }
        else {
            playlist.songs.push(songToAdd);
            console.log(`${songTitle} by ${artistName} added to playlist, '${playlistName}'.`);
            return true;
        }
    },

    /**
     * Function to remove a song from a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to remove.
     * @param {string} artistName - Artist of the song to remove.
     * @returns {boolean} True if song is removed, false if the playlist or song not found.
     */
    removeSongFromPlaylist(playlistName, songTitle, artistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return errorMessage('Playlist', playlistName, "not found"); 
        }

        const songIndex = playlist.songs.findIndex(song => song.title === songTitle && song.artist === artistName);
        if (songIndex === -1) {
            return errorMessage('Song', `${songTitle} by ${artistName}`, "not found in playlist"); 
        }
        else {
            playlist.songs.splice(songIndex, 1); 
            console.log(`Song ${songTitle} by ${artistName} removed from playlist '${playlistName}'.`);
            return true;
        }
    }, 

    /**
     * Function to delete a playlist and all of its contents.
     * @param {string} playlistName - Name of the playlist to delete.
     * @returns {boolean} True if playlist is deleted, false if the playlist not found.
     */
    deletePlaylist(playlistName) {

        const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName);
        if (playlistIndex === -1) {
            return errorMessage('Playlist', playlistName, "not found");
        } 
        else {
            playlists.splice(playlistIndex, 1);
            console.log(`Playlist '${playlistName}' deleted.`);
            return true;
        }
    },

    /**
     * Function to recommend songs from the same genre as the songs in a playlist.
     * @param {string} playlistName - Name of the playlist.
     * @returns {boolean} True if recommendations are displayed, false if the playlist is not found or no recommendations are available.
     */
    recommendSongs(playlistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return errorMessage('Playlist', playlistName, "not found"); 
        }

        const playlistGenres = new Set(playlist.songs.flatMap(song => song.genre));

        // An array to store recommendations
        const recommendations = [];

        playlistGenres.forEach(genre => {
            const genreSongs = genreToSongsMap.get(genre);
            if (genreSongs) {
                genreSongs.forEach(song => {
                    // Exclude songs already in the playlist
                    if (!playlist.songs.some(playlistSong => playlistSong.title === song.title)) {
                        recommendations.push(song);
                    }
                });
            }
        });

        if (recommendations.length === 0) {
            console.log("No recommendations found.");
            return false;
        } 
        else {
            console.log(`Recommendations for playlist, '${playlistName}':`);
            recommendations.forEach(song => console.log(`- ${song.title} by ${song.artist}`));
            return true;
        }
    }
}