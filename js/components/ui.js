// UI Components
import { toggleMusic } from '../player-functions.js';

function createPlayerUI() {
    const container = document.createElement('div');
    container.className = 'music-player loading';

    const albumCover = document.createElement('img');
    albumCover.className = 'album-cover';
    albumCover.alt = 'Album Cover';
    albumCover.src = 'assets/images/trollge.gif';

    const songInfo = document.createElement('div');
    songInfo.className = 'song-info';
    songInfo.innerHTML = `
        <div class="song-title">Checking Last.fm...</div>
        <div class="artist-name">via Last.fm</div>
    `;

    const controls = document.createElement('div');
    controls.className = 'player-controls';
    controls.innerHTML = `
        <button class="play-pause">
            <span class="play-icon">▶️</span>
            <span class="pause-icon" style="display: none;">⏸️</span>
        </button>
    `;

    container.append(albumCover, songInfo, controls);
    document.body.insertBefore(container, document.querySelector('.content-wrapper'));
    controls.querySelector('.play-pause').addEventListener('click', toggleMusic);

    return { container, albumCover, songInfo, controls };
}

export { createPlayerUI }; 