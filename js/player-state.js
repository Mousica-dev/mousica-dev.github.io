// Player state
import { SONGS } from './constants.js';

const playerState = {
    currentSongIndex: Math.floor(Math.random() * SONGS.length),
    isAudioInitialized: false,
    isMusicPlaying: false,
    isLastfmPlaying: false,
    isLoading: false
};

// Create and configure audio player
const audioPlayer = new Audio();
audioPlayer.volume = 1.0;

// Add error handling
audioPlayer.addEventListener('error', (e) => {
    console.error('Audio player error:', e);
    console.log('Error code:', audioPlayer.error.code);
    console.log('Error message:', audioPlayer.error.message);
});

// Preload metadata when source changes
audioPlayer.addEventListener('loadedmetadata', () => {
    console.log('Audio metadata loaded');
});

export { playerState, audioPlayer }; 