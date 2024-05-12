// Module to manage your playlist

const songs = [
    {
        title: 'Enemy',
        artist: 'Imagine Dragons',
        genre: ['Alernative', 'Rock'],
        year: 2021
    },
    {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        genre: ['Pop'],
        year: 2017
    },
    {
        title: 'Hymn for the Weekend',
        artist: 'Coldplay',
        genre: ['Alernative', 'Indie'],
        year: 2015
    }
]

const playlists = [];

// Helper function to find a playlist
function findPlaylist(playlistName) {
    return playlists.find(playlist => playlist.name === playlistName);
}

module.exports = {

    // Function to search for songs by the artist name or song title
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
            return [];
        } 
        else {
            console.log("Search Results:");
            results.forEach(song => console.log(`- ${song.title} by ${song.artist}`));
            return results; // Return the array of found songs
        }
    },

    // Function to create a new playlist
    createPlaylist(playlistName) {

        // Check if playlist already exist
        if (findPlaylist(playlistName)) {
            console.log(`Error: Playlist with name '${playlistName}' already exists.`);
            return false;
        }
    
        // Create playlist
        playlists.push({ name: playlistName, songs: [] });
        console.log(`Playlist '${playlistName}' created.`);
        return true;
    },

    // Function to edit a playlist's name
    editPlaylist(oldName, newName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(oldName);
        if (!playlist) {
            console.log(`Error: Playlist '${oldName}' not found.`);
            return false;
        }
        
        //Update playlist name
        playlist.name = newName;
        console.log(`Playlist renamed from '${oldName}' to '${newName}'.`);
        return true;
    },

    // Function to view the contents of a selected playlist
    viewPlaylist(playlistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            console.log(`Error: Playlist '${playlistName}' not found.`);
            return false;
        }
        
        // Check if playlist contains songs
        if (playlist.songs.length === 0) {
            console.log("Playlist is empty.");
            return false;
        } 
        // Show all songs in the playlist
        else {
            playlist.songs.forEach(song => console.log(`- ${song.title}`));
            return true;
        }
    },

    // Function to add a song to a selected playlist
    addSongToPlaylist(playlistName, songTitle) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            console.log(`Error: Playlist '${playlistName}' not found.`);
            return false;
        }

        // Check if song exist
        let songToAdd = songs.find(song => song.title === songTitle);

        if (!songToAdd) {
            console.log(`Error: Song ${songTitle} not found.`);
            return false;
        }
        
        // Add song to playlist
        playlist.songs.push(songToAdd);
        console.log(`${songTitle} added to playlist ${playlistName}.`);
        return true;
    },

    // Function to remove a song from a selected playlist
    removeSongFromPlaylist(playlistName, songTitle) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            console.log(`Error: Playlist '${playlistName}' not found.`);
            return false;
        }

        // Check if song exist in playlist
        const songIndex = playlist.songs.findIndex(song => song.title === songTitle);
        if (songIndex === -1) {
            console.log(`Error: Song '${songTitle}' not found in playlist '${playlistName}'.`);
            return false;
        }

        // Remove the song from the playlist
        playlist.songs.splice(songIndex, 1); 
        console.log(`Song '${songTitle}' removed from playlist '${playlistName}'.`);
        return true;
    }, 

    // Function to recommend similar songs from the same genre as the songs in their playlist
    recommendSongs(playlistName) {

        // Check if playlist does not exist
        let playlist = findPlaylist(playlistName);
        if (!playlist) {
            console.log(`Error: Playlist '${playlistName}' not found.`);
            return;
        }

        // Get all genres from the playlist
        const playlistGenres = new Set(); 
        playlist.songs.forEach(song => {
            song.genre.forEach(genre => playlistGenres.add(genre));
        });

        // Find songs with matching genres
        const recommendations = songs.filter(song => {
            return song.genre.some(genre => playlistGenres.has(genre)) &&
                   !playlist.songs.includes(song); // Exclude songs already in the playlist
        });

        if (recommendations.length === 0) {
            console.log("No recommendations found.");
        } 
        else {
            console.log(`Recommendations for playlist '${playlistName}':`);
            recommendations.forEach(song => console.log(`- ${song.title} by ${song.artist}`));
        }
    }
}