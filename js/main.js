// Main JavaScript file
import { playerState, audioPlayer } from './player-state.js';
import { createPlayerUI } from './components/ui.js';
import { playCurrentSong, initializeLastfmChecking } from './player-functions.js';
import { initializeStars } from './components/stars.js';
import { createVideoPlayer } from './components/video-player.js';
import { SONGS } from './constants.js';

// Create UI elements
const ui = createPlayerUI();

// Initialize video player
const videoPlayer = createVideoPlayer();

// Initialize stars immediately
initializeStars();

// Initialize
window.addEventListener('load', () => {
    initializeLastfmChecking();
});

// Handle song ending
audioPlayer.addEventListener('ended', () => {
    if (!playerState.isLastfmPlaying) {
        playerState.currentSongIndex = (playerState.currentSongIndex + 1) % SONGS.length;
        playCurrentSong();
    }
});

export { ui }; 