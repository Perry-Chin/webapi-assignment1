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
 * @param {string} name - Name of the entity causing the error.
 * @param {string} message - Description of the error.
 * @returns {string} The error message.
 */
function errorMessage(type, name, message) {
    const error = `Error: ${type} with name '${name}' ${message}.`;
    console.error(error);
    return error;
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
     * @returns {string} A string containing the search results. 
     * If no songs are found, return a message indicating that.
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
            return "No songs found matching your search.";
        } 

        else {
            let searchResults = "Search Results:\n";
            searchResults += results.map(song => `- ${song.title} by ${song.artist}`).join('\n');
            return searchResults;
        }
    },

    /**
     * Function to create a new playlist.
     * @param {string} playlistName - Name of the new playlist.
     * @returns {string} A success message if the playlist is created. 
     * Returns an error if the playlist name is invalid or already exists.
     */
    createPlaylist(playlistName) {
        if (!playlistName.trim()) {
            return errorMessage('Playlist', playlistName, "is not allowed"); 
        }

        else if (playlistExist(playlistName)) {
            return errorMessage('Playlist', playlistName, "already exists"); 
        }

        else {
            playlists.push({ name: playlistName, songs: [] });
            return `Playlist '${playlistName}' created.`; 
        }
    },

    /**
     * Function to edit the name of a playlist.
     * @param {string} oldName - Current name of the playlist.
     * @param {string} newName - New name for the playlist.
     * @returns {string} A success message if playlist name is edited. 
     * Returns an error message if playlist name is not found, invalid or already exists.
     */
    editPlaylist(oldName, newName) {
        let playlist = playlistExist(oldName);
        if (!playlist) {
            return errorMessage('Playlist', oldName, "not found"); 
        } 

        else if (!newName.trim()) {
            return errorMessage('Playlist', newName, "is not allowed"); 
        }

        else if (playlists.some(playlist => playlist.name === newName && playlist.name !== oldName)) {
            return errorMessage('Playlist', newName, "already exists"); 
        }
        
        else {
            playlist.name = newName;
            return `Playlist renamed from '${oldName}' to '${newName}'.`;
        }    
    },

    /**
     * Function to view all songs in a selected playlist with title and artist.
     * @param {string} playlistName - Name of the playlist to view.
     * @returns {string} A string containing songs in the playlist. 
     * Returns an error message if the playlist is not found or empty.
     */
    viewPlaylist(playlistName) {
        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return errorMessage('Playlist', playlistName, "not found"); 
        }
        
        else if (playlist.songs.length === 0) {
            return "Playlist is empty.";
        } 

        else {
            let playlistContent = `Songs in ${playlistName}:\n`;
            playlistContent += playlist.songs.map(song => `- ${song.title} by ${song.artist}`).join('\n');
            return playlistContent;
        }
    },

    /**
     * Function to add a song to a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to add.
     * @param {string} artistName - Artist of the song to add.
     * @returns {string} A success message if song is added.
     * Returns an error message if the playlist is not found, the song is not found, or song already exists in playlist.
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
        
        else if (playlist.songs.some(song => song.title === songTitle && song.artist === artistName)) {
            return errorMessage('Song', `${songTitle} by ${artistName}`, "already exists in playlist"); 
        }

        else {
            playlist.songs.push(songToAdd);
            return `${songTitle} by ${artistName} added to playlist, '${playlistName}'.`;
        }
    },

    /**
     * Function to remove a song from a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to remove.
     * @param {string} artistName - Artist of the song to remove.
     * @returns {string} A success message if song is removed. 
     * Returns an error message if the playlist is not found or the song is not found.
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
            return `Song ${songTitle} by ${artistName} removed from playlist '${playlistName}'.`;
        }
    }, 

    /**
     * Function to delete a playlist and all of its contents.
     * @param {string} playlistName - Name of the playlist to delete.
     * @returns {string} A success message if playlist is deleted. 
     * Returns an error message if the playlist is not found.
     */
    deletePlaylist(playlistName) {
        const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName);
        if (playlistIndex === -1) {
            return errorMessage('Playlist', playlistName, "not found");
        } 

        else {
            playlists.splice(playlistIndex, 1);
            return `Playlist '${playlistName}' deleted.`;
        }
    },

    /**
     * Function to recommend songs from the same genre as the songs in a playlist.
     * @param {string} playlistName - Name of the playlist.
     * @returns {string} A string containing recommendations. 
     * Returns an error message if the playlist is not found or if no recommendations are available.
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
            return "No recommendations found.";
        } 

        else {
            let recommendationResults = `Recommendations for '${playlistName}':\n`;
            recommendationResults += recommendations.map(song => `- ${song.title} by ${song.artist}`).join('\n');
            return recommendationResults;
        }
    }
}