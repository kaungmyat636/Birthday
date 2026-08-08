// NAME already set to "Babe" in index.html
// Images: put your photos in /images/ named photo1.jpg ... photo6.jpg

document.addEventListener('DOMContentLoaded', () => {
  // Typewriter for main hero wish (Babe already set in messages)
  const messages = [
    "Happy Birthday, Babe! 🎂",
    "Babe, you light up every room — keep shining ✨",
    "Wishing you love, laughs and endless cake, Babe! 🍰"
  ];
  const typeEl = document.getElementById('typewriter');
  let msgIndex = 0, charIndex = 0, forward = true;

  function tick() {
    const msg = messages[msgIndex];
    if (forward) {
      charIndex++;
      if (charIndex >= msg.length) { forward = false; setTimeout(tick, 1500); return; }
    } else {
      charIndex--;
      if (charIndex <= 0) { forward = true; msgIndex = (msgIndex + 1) % messages.length; setTimeout(tick, 300); return; }
    }
    typeEl.textContent = msg.slice(0, charIndex);
    setTimeout(tick, forward ? 45 : 18);
  }
  tick();

  // Thumbnails -> main photo
  const thumbs = document.querySelectorAll('.thumb');
  const mainPhoto = document.getElementById('mainPhoto');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const large = t.dataset.large || t.src;
      mainPhoto.src = large;
      // small pulse effect
      const pf = document.getElementById('photoFrame');
      pf.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:280,easing:'cubic-bezier(.2,.9,.2,1)'});
    });
  });
  // mark first active
  if (thumbs[0]) thumbs[0].classList.add('active');

  // Vertical slides: simple swipe / wheel
  const slidesEl = document.getElementById('slides');
  const slides = Array.from(slidesEl.children);
  let current = 0;
  function showSlide(idx){
    slides.forEach((s,i)=> s.style.transform = `translateY(${(i-idx)*100}%)`);
  }
  showSlide(0);
  // handle wheel
  let wheelCool = false;
  slidesEl.addEventListener('wheel', e => {
    if (wheelCool) return;
    if (e.deltaY > 10 && current < slides.length-1) current++;
    else if (e.deltaY < -10 && current > 0) current--;
    showSlide(current);
    wheelCool = true; setTimeout(()=>wheelCool=false, 400);
  }, {passive:true});
  // handle touch
  let startY = null;
  slidesEl.addEventListener('touchstart', e => startY = e.touches[0].clientY);
  slidesEl.addEventListener('touchend', e => {
    if (startY === null) return;
    const diff = startY - (e.changedTouches[0].clientY);
    if (diff > 30 && current < slides.length-1) current++;
    if (diff < -30 && current > 0) current--;
    showSlide(current);
    startY = null;
  });

  // Floating hearts on heart button
  const heartBtn = document.getElementById('heartBtn');
  heartBtn.addEventListener('click', e => {
    spawnHearts(e.clientX, e.clientY, 8);
  });

  function spawnHearts(x,y,count=6){
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = ['❤️','💖','💜','💕'][Math.floor(Math.random()*4)];
      document.body.appendChild(el);
      const size = 12 + Math.random()*18;
      el.style.left = (x - size/2) + 'px';
      el.style.top = (y - size/2) + 'px';
      el.style.fontSize = size + 'px';
      const dx = (Math.random()-0.5) * 120;
      const dy = - (80 + Math.random()*220);
      el.animate([
        {transform:'translateY(0) scale(1)', opacity:1},
        {transform:`translate(${dx}px, ${dy}px) scale(1.2)`, opacity:0}
      ], {duration:900 + Math.random()*900, easing:'cubic-bezier(.2,-0.2,.3,1)'});
      setTimeout(()=> el.remove(), 1800);
    }
  }

  // Confetti canvas (simple)
  const confettiBtn = document.getElementById('confettiBtn');
  confettiBtn.addEventListener('click', () => fireConfetti(120));

  function fireConfetti(amount=80) {
    const colors = ['#ff6b6b','#ffb86b','#ffd56b','#6bf2c6','#6bb3ff','#c36bff'];
    for (let i=0;i<amount;i++){
      const el = document.createElement('div');
      document.body.appendChild(el);
      const w = 8 + Math.random()*12;
      el.style.position='fixed'; el.style.zIndex=9999; el.style.left=(window.innerWidth*0.5 + (Math.random()-0.5)*400)+'px';
      el.style.top=(window.innerHeight*0.3 + (Math.random()-0.5)*200)+'px';
      el.style.width=w+'px'; el.style.height=(w*0.6)+'px';
      el.style.background=colors[Math.floor(Math.random()*colors.length)];
      el.style.transform='rotate('+ (Math.random()*360)+'deg)';
      el.style.borderRadius='2px';
      el.style.pointerEvents='none';
      const dx = (Math.random()-0.5)*800;
      const dy = 600 + Math.random()*400;
      el.animate([{transform:'translateY(0) rotate(0) scale(1)', opacity:1},{transform:`translate(${dx}px, ${dy}px) rotate(${(Math.random()*600-300)}deg) scale(0.8)`, opacity:0}], {duration:1500+Math.random()*900,easing:'cubic-bezier(.2,.9,.2,1)'});
      setTimeout(()=>el.remove(), 2600);
    }
  }

  // Optional: click main avatar to swap between main and thumbnail images quickly
  const avatar = document.getElementById('mainAvatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const firstThumb = thumbs[0];
      if (firstThumb) {
        mainPhoto.src = firstThumb.dataset.large || firstThumb.src;
        thumbs.forEach(t=>t.classList.remove('active'));
        firstThumb.classList.add('active');
      }
    });
  }
});
