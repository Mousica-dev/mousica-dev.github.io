// Star initialization
function initializeStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star-background';
        
        const sizeClass = Math.random() < 0.6 ? 'small' : 
                        Math.random() < 0.9 ? 'medium' : 'large';
        star.classList.add(sizeClass);
        
        star.style.left = `${5 + Math.random() * 90}%`;
        star.style.top = `${5 + Math.random() * 90}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        star.style.setProperty('--delay', `${Math.random() * 3}s`);
        star.style.setProperty('--brightness', `${0.5 + Math.random() * 0.5}`);
        
        starsContainer.appendChild(star);
    }
}

export { initializeStars }; 