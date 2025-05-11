// Video player component
function createVideoPlayer() {
    const container = document.createElement('div');
    container.className = 'video-player';
    container.innerHTML = `
        <video id="main-video" class="video-element" loop>
            <source src="./assets/video/background.mp4" type="video/mp4">
        </video>
        <div id="video-permission" class="video-permission" style="display: none;">
            <p>Click to enable video playback</p>
            <button id="video-permission-button">Enable Video</button>
        </div>
    `;

    document.body.insertBefore(container, document.querySelector('.content-wrapper'));

    const video = container.querySelector('#main-video');
    const permissionDiv = container.querySelector('#video-permission');
    const permissionButton = container.querySelector('#video-permission-button');

    // Initialize video with default settings
    video.volume = 0.5;
    video.muted = true; // Start muted to comply with autoplay policies

    // Handle video permission
    video.play().catch(() => {
        permissionDiv.style.display = 'block';
    });

    permissionButton.addEventListener('click', () => {
        video.muted = false;
        video.play()
            .then(() => {
                permissionDiv.style.display = 'none';
            })
            .catch(console.error);
    });

    return { container, video };
}

export { createVideoPlayer }; 