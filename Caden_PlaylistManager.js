// Module to manage your playlist

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
 * Helper function to log an error message related to playlists.
 * @param {string} playlistName - Name of the playlist.
 * @param {string} message - Error message.
 * @returns {boolean} Always returns false.
 */
function playlistError(playlistName, message) {
    console.log(`Error: Playlist with name '${playlistName}' ${message}.`);
    return false;
}

// Create a mapping of genres to songs
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
     * Function to search for songs by the artist or title (case-insensitive).
     * @param {string} query - Search query for song title or artist.
     * @returns {boolean} True if songs are found matching the search query, false otherwise.
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

        if (results.length === 0) {
            console.log("No songs found matching your search.");
            return false;
        } 
        else {
            console.log("Search Results:");
            results.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return true;
        }
        
    },

    /**
     * Function to create a new playlist.
     * @param {string} playlistName - Name of the new playlist.
     * @returns {boolean} True if the playlist is created, false if playlist name is invalid or already exist.
     */
    createPlaylist(playlistName) {

        if (!playlistName.trim()) {
            return playlistError(playlistName, "is not allowed"); 
        }

        if (playlistExist(playlistName)) {
            return playlistError(playlistName, "already exists"); 
        }
        else {
            playlists.push({ name: playlistName, songs: [] });
            console.log(`Playlist '${playlistName}' created.`);
            return true;
        }

    },

    /**
     * Edit the name of a playlist.
     * @param {string} oldName - Current name of the playlist.
     * @param {string} newName - New name for the playlist.
     * @returns {boolean} True if the playlist name is edited, false if playlist name is invalid or not found.
     */
    editPlaylist(oldName, newName) {

        if (!newName.trim()) {
            return playlistError(newName, "is not allowed"); 
        }
        
        let playlist = playlistExist(oldName);
        if (!playlist) {
            return playlistError(oldName, "not found"); 
        }
        
        // Check if the new playlist name already exists and is not the old name
        if (playlists.some(playlist => playlist.name === newName && playlist.name !== oldName)) {
            console.log(`Error: Playlist with name '${newName}' already exists.`);
            return false;
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
            return playlistError(playlistName, "not found"); 
        }
        
        if (playlist.songs.length === 0) {
            console.log("Playlist is empty.");
            return false;
        } 
        else {
            console.log(`Songs in ${playlistName}:`);
            playlist.songs.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return true;
        }
    },

    /**
     * Function to add a song to a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to add.
     * @param {string} artistName - Artist of the song to add.
     * @returns {boolean} True if the song is added, false if song or playlist not found or song already exist in playlist.
     */
    addSongToPlaylist(playlistName, songTitle, artistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }

        let songToAdd = songs.find(song => song.title === songTitle && song.artist === artistName);
        if (!songToAdd) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' not found.`);
            return false;
        }
        
        if (playlist.songs.some(song => song.title === songTitle && song.artist === artistName)) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' already exists in playlist '${playlistName}'.`);
            return false;
        }
        else {
            playlist.songs.push(songToAdd);
            console.log(`'${songTitle}' by '${artistName}' added to playlist, '${playlistName}'.`);
            return true;
        }
        
    },

    /**
     * Function to remove a song from a selected playlist.
     * @param {string} playlistName - Name of the playlist.
     * @param {string} songTitle - Title of the song to remove.
     * @param {string} artistName - Artist of the song to remove.
     * @returns {boolean} True if the song is removed, false if the playlist or song not found.
     */
    removeSongFromPlaylist(playlistName, songTitle, artistName) {

        let playlist = playlistExist(playlistName);
        if (!playlist) {
            return playlistError(playlistName, "not found"); 
        }

        const songIndex = playlist.songs.findIndex(song => song.title === songTitle && song.artist === artistName);
        if (songIndex === -1) {
            console.log(`Error: Song '${songTitle}' by '${artistName}' not found in playlist '${playlistName}'.`);
            return false;
        }
        else {
            playlist.songs.splice(songIndex, 1); 
            console.log(`Song '${songTitle}' by '${artistName}' removed from playlist '${playlistName}'.`);
            return true;
        }
        
    }, 

    /**
     * Function to delete a playlist and all of its contents.
     * @param {string} playlistName - Name of the playlist to delete.
     * @returns {boolean} True if the playlist is deleted, false if the playlist not found.
     */
    deletePlaylist(playlistName) {
        
        const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName);
        if (playlistIndex === -1) {
            return playlistError(playlistName, "not found");
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
            return playlistError(playlistName, "not found"); 
        }

        // Get all genres from songs in the playlist
        const playlistGenres = new Set(playlist.songs.flatMap(song => song.genre));

        // Array to store recommendations
        const recommendations = [];

        // Find songs with matching genres
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
            console.log(`Recommendations for playlist '${playlistName}':`);
            recommendations.forEach(song => console.log(`- '${song.title}' by '${song.artist}'`));
            return true;
        }
    }
}