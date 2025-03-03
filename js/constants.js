// Constants and configurations
const SONGS = [
    {
        file: 'assets/audio/Maddy-Soma-OKE.mp4',
        title: 'Oke',
        artist: 'Maddy Soma',
        cover: 'assets/images/album-cover-oke.png'
    },
    {
        file: 'assets/audio/Falling-In-Reverse-Prequel.mp4',
        title: 'Prequel',
        artist: 'Falling In Reverse',
        cover: 'assets/images/album-cover-prequel.png'
    },
    {
        file: 'assets/audio/Godsmack-Bulletproof.mp4',
        title: 'Bulletproof',
        artist: 'Godsmack',
        cover: 'assets/images/album-cover-bulletproof.png'
    }
];

const SPOTIFY_API_URL = 'https://spring-tooth-3a41.golonchy-aitta.workers.dev';
const INITIAL_CHECK_INTERVAL = 5000;
const NORMAL_CHECK_INTERVAL = 30000;
const AUDIO_PATHS = {
    SPOTIFY_DETECT: 'assets/audio/play-when-spotify-is-detected.mp4'
};

export { SONGS, SPOTIFY_API_URL, INITIAL_CHECK_INTERVAL, NORMAL_CHECK_INTERVAL, AUDIO_PATHS }; 