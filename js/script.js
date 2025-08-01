document.addEventListener('DOMContentLoaded', function() {
    const matrixHearts = document.getElementById('matrixHearts');
    const heartSymbols = ['❤', '♥', '💖', '💗', '💘', '💓'];

    function createMatrixHearts() {
        const heart = document.createElement('div');
        heart.className = 'heart-matrix';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = 2 + Math.random() * 3 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = (10 + Math.random() * 15) + 'px';
        matrixHearts.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    setInterval(createMatrixHearts, 100);

    const heartBtn = document.getElementById('heartBtn');
    const letterModal = document.getElementById('letterModal');
    const closeBtn = document.getElementById('closeBtn');
    const trackTitle = document.getElementById('trackTitle');

    heartBtn.addEventListener('click', function() {
        letterModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createHeartExplosion(), i * 50);
        }
    });

    closeBtn.addEventListener('click', function() {
        letterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === letterModal) {
            letterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const tracks = {
        damiano: new Audio('https://dl.dropboxusercontent.com/scl/fi/dobrjo13u1ojzir71osbg/Damiano-David-The-First-Time-Official-Visual-Video-MP3_160K.mp3?rlkey=q4jvp9bw5t66vwllkfy5m2it7&st=6otqkbua'),
        ladygaga: new Audio('https://dl.dropboxusercontent.com/scl/fi/0tpnzrvm58tup3big7bar/Lady-Gaga_-Bruno-Mars-Die-With-A-Smile-Official-Music-Video-MP3_160K-_083713.mp3?rlkey=avn3ac2mqpgg8m7lw4qwnm9g7&st=4cf0k7u1')
    };

    let currentAudio = tracks.damiano;
    let isPlaying = false;

    const musicBtn = document.getElementById('musicBtn');
    const switchBtn = document.getElementById('switchBtn');

    function updateTitle(text) {
        trackTitle.textContent = `🎵 ${text}`;
    }

    function playAudio(audio, title) {
        if (currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = audio;
        }
        currentAudio.play().catch(e => console.log("Autoplay bloqueado."));
        isPlaying = true;
        musicBtn.textContent = '❚❚';
        updateTitle(title);
    }

    function toggleAudio() {
        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            musicBtn.textContent = '♪';
        } else {
            currentAudio.play().catch(e => console.log("Autoplay bloqueado."));
            isPlaying = true;
            musicBtn.textContent = '❚❚';
        }
    }

    musicBtn.addEventListener('click', toggleAudio);
    heartBtn.addEventListener('click', toggleAudio);

    switchBtn.addEventListener('click', () => {
        if (currentAudio === tracks.damiano) {
            playAudio(tracks.ladygaga, 'Lady Gaga & Bruno Mars - Die With A Smile');
        } else {
            playAudio(tracks.damiano, 'Damiano David - The First Time');
        }
    });

    window.addEventListener('mousemove', function autoPlayOnce() {
        if (!isPlaying) {
            playAudio(currentAudio, 'Damiano David - The First Time');
        }
        window.removeEventListener('mousemove', autoPlayOnce);
    });

    function createHeartExplosion() {
        const explosion = document.createElement('div');
        explosion.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        explosion.style.position = 'fixed';
        explosion.style.left = Math.random() * 100 + 'vw';
        explosion.style.top = Math.random() * 100 + 'vh';
        explosion.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
        explosion.style.fontSize = '25px';
        explosion.style.zIndex = '100';
        explosion.style.transform = 'scale(0)';
        explosion.style.animation = `pop 0.5s forwards, fadeOut 0.5s 0.5s forwards`;
        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 1000);
    }

    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pop {
            to { transform: scale(1); }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(style);
});
