// Main JavaScript file
import { playerState, audioPlayer } from './player-state.js';
import { createPlayerUI } from './components/ui.js';
import { playCurrentSong, initializeSpotifyChecking } from './player-functions.js';
import { initializeStars } from './components/stars.js';
import { SONGS } from './constants.js';

// Create UI elements
const ui = createPlayerUI();

// Initialize stars immediately
initializeStars();

// Initialize
window.addEventListener('load', () => {
    initializeSpotifyChecking();
});

// Handle song ending
audioPlayer.addEventListener('ended', () => {
    if (!playerState.isSpotifyPlaying) {
        playerState.currentSongIndex = (playerState.currentSongIndex + 1) % SONGS.length;
        playCurrentSong();
    }
});

export { ui }; 