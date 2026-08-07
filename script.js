// Simple birthday template script
(function(){
  const qs = new URLSearchParams(location.search);
  const name = qs.get('name') || qs.get('n') || 'Friend';
  const msg  = qs.get('msg') || qs.get('message') || 'Wishing you a day filled with love and joy.';
  const music = qs.get('music') || '';

  // populate
  document.getElementById('name').textContent = decodeURIComponent(name);
  document.getElementById('message').textContent = decodeURIComponent(msg);

  // audio
  const audio = document.getElementById('bgmusic');
  if (music) {
    audio.src = music;
  } else {
    audio.src = ''; // no default music to avoid copyright
  }

  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', () => {
    if (!audio.src) {
      alert('No music URL provided. Add ?music=https://your-hosted-file.mp3');
      return;
    }
    if (audio.paused) {
      audio.play().catch(()=> alert('Browser blocked autoplay. Tap play to allow audio.'));
      playBtn.textContent = 'Pause Music';
    } else {
      audio.pause();
      playBtn.textContent = 'Play Music';
    }
  });

  // share: copy current URL (with existing params)
  document.getElementById('shareBtn').addEventListener('click', async () => {
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      shareBtnFeedback('Link copied!');
    } catch(e){
      prompt('Copy this link:', url);
    }
  });
  function shareBtnFeedback(msg){
    const b = document.getElementById('shareBtn');
    const prev = b.textContent;
    b.textContent = msg;
    setTimeout(()=> b.textContent = prev, 1800);
  }

  // confetti canvas (simple)
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  window.addEventListener('resize', ()=>{W=canvas.width=innerWidth;H=canvas.height=innerHeight});

  const colors = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#A66CFF'];
  function rand(min,max){return Math.random()*(max-min)+min}

  function Confetti(){
    this.x = rand(0,W);
    this.y = rand(-H,0);
    this.w = rand(6,12);
    this.h = rand(8,16);
    this.vx = rand(-1.5,1.5);
    this.vy = rand(2,5);
    this.angle = rand(0,Math.PI*2);
    this.color = colors[Math.floor(rand(0,colors.length))];
    this.rotSpeed = rand(-0.1,0.1);
  }
  Confetti.prototype.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.rotSpeed;
    if (this.y > H+20) {
      this.y = rand(-H,0); this.x = rand(0,W);
    }
  };
  Confetti.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h);
    ctx.restore();
  };

  let confetti = [];
  function startConfetti(duration = 4000){
    confetti = [];
    const count = Math.floor(Math.min(120, 40 + (window.innerWidth/10)));
    for (let i=0;i<count;i++) confetti.push(new Confetti());
    let start = performance.now();
    function loop(t){
      ctx.clearRect(0,0,W,H);
      for (let c of confetti){ c.update(); c.draw(); }
      if (t - start < duration) requestAnimationFrame(loop);
      else ctx.clearRect(0,0,W,H);
    }
    requestAnimationFrame(loop);
  }

  document.getElementById('confettiBtn').addEventListener('click', ()=> startConfetti(5000));

  // convenience: if URL has autostart=1 try to play
  if (qs.get('autostart') === '1' && audio.src) {
    audio.play().then(()=> playBtn.textContent='Pause Music').catch(()=>{/*blocked*/});
  }
})();
