// Get URL parameters for custom messages
const urlParams = new URLSearchParams(window.location.search);
const customName = urlParams.get('name');
const customMsg = urlParams.get('msg');

if (customName) {
    document.getElementById('name').innerText = Happy Birthday, ${customName}!-
} else {
    document.getElementById('name').innerText = "Happy Birthday, Bbe!";
}

if (customMsg) {
    document.getElementById('message').innerText = customMsg;
} else {
    document.getElementById('message').innerText = "Wishing you all the best on your special day!";
}

// Button and Audio functionality
const playBtn = document.getElementById('playBtn');
const bgMusic = document.getElementById('bgmusic');
const shareBtn = document.getElementById('shareBtn');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            playBtn.innerText = "Pause Music";
        }).catch(error => {
            alert("Browser blocked autoplay. Tap play to allow audio.");
        });
    } else {
        bgMusic.pause();
        isPlaying = false;
        playBtn.innerText = "Play Music";
    }
});

shareBtn.addEventListener('click', () => {
    // Confetti effect trigger
    startConfetti();
    
    // Copy link functionality
    navigator.clipboard.writeText(window.location.href);
    shareBtn.innerText = "Link copied!";
    setTimeout(() => {
        shareBtn.innerText = "Celebrate!";
    }, 2000);
});

// Simple Confetti Effect
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 50 + 10,
            color: hsl(${Math.random() * 360}, 100%, 50%),
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });
        update();
    }

    function update() {
        particles.forEach((p) => {
            p.y += 3;
            if (p.y > canvas.height) p.y = -10;
        });
    }

    let interval = setInterval(draw, 20);
    setTimeout(() => clearInterval(interval), 4000);
}
