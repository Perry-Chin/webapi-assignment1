const playlist = require('./Caden_PlaylistManager.js');

// Search for songs with the same name
playlist.searchSongs("Enemy") 

// Create a new playlist
playlist.createPlaylist("MyPlaylist");

// Add a song to the playlist
playlist.addSongToPlaylist("MyPlaylist", "Enemy");

// View the contents of the playlist
playlist.viewPlaylist("MyPlaylist");

// Edit the playlist name
playlist.editPlaylist("MyPlaylist", "NewPlaylist");

// Get song recommendations based on the playlist
playlist.recommendSongs("NewPlaylist");

// Remove a song from the playlist
playlist.removeSongFromPlaylist("NewPlaylist", "Enemy");