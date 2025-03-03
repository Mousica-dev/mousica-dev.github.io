// Player state
import { SONGS } from './constants.js';

const playerState = {
    currentSongIndex: Math.floor(Math.random() * SONGS.length),
    isAudioInitialized: false,
    isMusicPlaying: false,
    isSpotifyPlaying: false,
    isLoading: false
};

// Create and configure audio player
const audioPlayer = new Audio();
audioPlayer.volume = 1.0;

export { playerState, audioPlayer }; 