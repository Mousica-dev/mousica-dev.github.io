// Player functions
import { SONGS, AUDIO_PATHS, LASTFM_API_URL, INITIAL_CHECK_INTERVAL, NORMAL_CHECK_INTERVAL } from './constants.js';
import { playerState, audioPlayer } from './player-state.js';
import { ui } from './main.js';

function updatePlaybackUI() {
    const playIcon = ui.controls.querySelector('.play-icon');
    const pauseIcon = ui.controls.querySelector('.pause-icon');
    playIcon.style.display = playerState.isMusicPlaying ? 'none' : 'inline';
    pauseIcon.style.display = playerState.isMusicPlaying ? 'inline' : 'none';
}

function toggleMusic() {
    if (playerState.isLastfmPlaying) return;
    
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
    ui.container.classList.add('loading');

    const currentSong = SONGS[playerState.currentSongIndex];
    
    try {
        ui.songInfo.querySelector('.song-title').textContent = 'Loading audio...';
        ui.songInfo.querySelector('.artist-name').textContent = 'Please wait';
        
        // Preload the audio
        await new Promise((resolve, reject) => {
            audioPlayer.src = currentSong.file;
            audioPlayer.load(); // Explicitly load the audio
            
            audioPlayer.oncanplaythrough = resolve;
            audioPlayer.onerror = reject;
        });
        
        await audioPlayer.play();
        
        ui.songInfo.querySelector('.song-title').textContent = currentSong.title;
        ui.songInfo.querySelector('.artist-name').textContent = currentSong.artist;
        ui.albumCover.src = currentSong.cover;
        
        playerState.isMusicPlaying = true;
        updatePlaybackUI();
    } catch (error) {
        console.error('Error playing song:', error);
        // Try next song if current fails
        playerState.currentSongIndex = (playerState.currentSongIndex + 1) % SONGS.length;
        setTimeout(() => playCurrentSong(), 2000);
    } finally {
        playerState.isLoading = false;
        ui.container.classList.remove('loading');
    }
}

function initializeAudio() {
    if (playerState.isAudioInitialized) return;

    const unmuteBanner = document.createElement('div');
    unmuteBanner.className = 'unmute-banner';
    unmuteBanner.textContent = 'Click anywhere for sound';
    document.body.appendChild(unmuteBanner);

    const initializePlayback = async () => {
        try {
            unmuteBanner.remove();
            playerState.isAudioInitialized = true;
            // Create a temporary audio context to unlock audio
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await audioContext.resume();
            await playCurrentSong();
        } catch (error) {
            console.error('Audio initialization error:', error);
        }
    };

    document.addEventListener('click', initializePlayback, { once: true });
}

async function checkLastfmStatus() {
    try {
        const response = await fetch(LASTFM_API_URL);
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
            
            if (!playerState.isLastfmPlaying) {
                audioPlayer.src = AUDIO_PATHS.LASTFM_DETECT;
                audioPlayer.loop = true;
                await audioPlayer.play();
                playerState.isLastfmPlaying = true;
                playerState.isMusicPlaying = true;
            }
        } else {
            playerState.isLastfmPlaying = false;
            if (!playerState.isAudioInitialized) {
                initializeAudio();
            }
        }
    } catch (error) {
        console.error('Error checking Last.fm status:', error);
        if (!playerState.isAudioInitialized) {
            initializeAudio();
        }
    }
}

// Initialize Last.fm checking
function initializeLastfmChecking() {
    checkLastfmStatus();
    const initialChecks = setInterval(checkLastfmStatus, INITIAL_CHECK_INTERVAL);
    setTimeout(() => {
        clearInterval(initialChecks);
        setInterval(checkLastfmStatus, NORMAL_CHECK_INTERVAL);
    }, 30000);
}

export { 
    updatePlaybackUI, 
    toggleMusic, 
    playCurrentSong, 
    initializeAudio, 
    checkLastfmStatus,
    initializeLastfmChecking
}; 