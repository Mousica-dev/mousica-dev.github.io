// Player functions
import { SONGS, AUDIO_PATHS, SPOTIFY_API_URL, INITIAL_CHECK_INTERVAL, NORMAL_CHECK_INTERVAL } from './constants.js';
import { playerState, audioPlayer } from './player-state.js';
import { ui } from './main.js';

function updatePlaybackUI() {
    const playIcon = ui.controls.querySelector('.play-icon');
    const pauseIcon = ui.controls.querySelector('.pause-icon');
    playIcon.style.display = playerState.isMusicPlaying ? 'none' : 'inline';
    pauseIcon.style.display = playerState.isMusicPlaying ? 'inline' : 'none';
}

function toggleMusic() {
    if (playerState.isSpotifyPlaying) return;
    
    if (playerState.isMusicPlaying) {
        audioPlayer.pause();
        playerState.isMusicPlaying = false;
    } else {
        audioPlayer.play().catch(console.error);
        playerState.isMusicPlaying = true;
    }
    updatePlaybackUI();
}

async function playCurrentSong() {
    if (playerState.isLoading) return;
    playerState.isLoading = true;

    const currentSong = SONGS[playerState.currentSongIndex];
    
    try {
        ui.songInfo.querySelector('.song-title').textContent = 'Loading audio...';
        ui.songInfo.querySelector('.artist-name').textContent = 'Please wait';
        
        audioPlayer.src = currentSong.file;
        await audioPlayer.play();
        
        ui.songInfo.querySelector('.song-title').textContent = currentSong.title;
        ui.songInfo.querySelector('.artist-name').textContent = currentSong.artist;
        ui.albumCover.src = currentSong.cover;
        
        playerState.isMusicPlaying = true;
        updatePlaybackUI();
    } catch (error) {
        console.error('Error playing song:', error);
        playerState.currentSongIndex = (playerState.currentSongIndex + 1) % SONGS.length;
        setTimeout(() => playCurrentSong(), 2000);
    } finally {
        playerState.isLoading = false;
    }
}

function initializeAudio() {
    if (playerState.isAudioInitialized) return;

    const unmuteBanner = document.createElement('div');
    unmuteBanner.className = 'unmute-banner';
    unmuteBanner.textContent = 'Click anywhere for sound';
    document.body.appendChild(unmuteBanner);

    document.addEventListener('click', () => {
        unmuteBanner.remove();
        playerState.isAudioInitialized = true;
        playCurrentSong();
    }, { once: true });
}

async function checkSpotifyStatus() {
    try {
        const response = await fetch(SPOTIFY_API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const track = data.recenttracks?.track?.[0];
        
        if (track?.['@attr']?.nowplaying === 'true') {
            const imageUrl = track.image?.find(img => img.size === 'large')?.[`#text`];
            if (imageUrl) {
                ui.albumCover.src = imageUrl;
            }
            
            ui.songInfo.querySelector('.song-title').textContent = track.name;
            ui.songInfo.querySelector('.artist-name').textContent = track.artist['#text'];
            
            if (!playerState.isSpotifyPlaying) {
                audioPlayer.src = AUDIO_PATHS.SPOTIFY_DETECT;
                audioPlayer.loop = true;
                await audioPlayer.play();
                playerState.isSpotifyPlaying = true;
                playerState.isMusicPlaying = true;
            }
        } else {
            playerState.isSpotifyPlaying = false;
            if (!playerState.isAudioInitialized) {
                initializeAudio();
            }
        }
    } catch (error) {
        console.error('Error checking Spotify status:', error);
        if (!playerState.isAudioInitialized) {
            initializeAudio();
        }
    }
}

// Initialize Spotify checking
function initializeSpotifyChecking() {
    checkSpotifyStatus();
    const initialChecks = setInterval(checkSpotifyStatus, INITIAL_CHECK_INTERVAL);
    setTimeout(() => {
        clearInterval(initialChecks);
        setInterval(checkSpotifyStatus, NORMAL_CHECK_INTERVAL);
    }, 30000);
}

export { 
    updatePlaybackUI, 
    toggleMusic, 
    playCurrentSong, 
    initializeAudio, 
    checkSpotifyStatus,
    initializeSpotifyChecking
}; 