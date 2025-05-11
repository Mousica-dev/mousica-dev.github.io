// Constants and configurations
const SONGS = [
    {
        file: 'assets/audio/Maddy-Soma-OKE.webm',
        title: 'Oke',
        artist: 'Maddy Soma',
        cover: 'assets/images/album-cover-oke.png'
    },
    {
        file: 'assets/audio/Falling-In-Reverse-Prequel.webm',
        title: 'Prequel',
        artist: 'Falling In Reverse',
        cover: 'assets/images/album-cover-prequel.png'
    },
    {
        file: 'assets/audio/Godsmack-Bulletproof.webm',
        title: 'Bulletproof',
        artist: 'Godsmack',
        cover: 'assets/images/album-cover-bulletproof.png'
    }
];

const LASTFM_API_URL = 'https://spring-tooth-3a41.golonchy-aitta.workers.dev';
const INITIAL_CHECK_INTERVAL = 5000;
const NORMAL_CHECK_INTERVAL = 30000;
const AUDIO_PATHS = {
    LASTFM_DETECT: 'assets/audio/play-when-lastfm-is-detected.webm'
};

export { SONGS, LASTFM_API_URL, INITIAL_CHECK_INTERVAL, NORMAL_CHECK_INTERVAL, AUDIO_PATHS }; 