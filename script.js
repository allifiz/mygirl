const $=s=>document.querySelector(s);const letter=$('#letter');let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function burst(x=innerWidth/2,y=innerHeight/2,count=24){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(let i=0;i<count;i++){const p=document.createElement('span');p.className='particle';p.textContent=['💜','♡','✦','✧'][i%4];p.style.left=(x+Math.random()*160-80)+'px';p.style.top=(y+Math.random()*80-40)+'px';p.style.setProperty('--drift',(Math.random()*240-120)+'px');p.style.animationDelay=Math.random()*.3+'s';$('#particles').append(p);setTimeout(()=>p.remove(),3000)}}
$('#open').onclick=()=>{letter.showModal();burst()};$('#close').onclick=()=>letter.close();letter.addEventListener('click',e=>{if(e.target===letter){const r=letter.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)letter.close()}});$('#letter-hug').onclick=()=>{letter.close();burst();toast('Suratnya boleh dibuka lagi kapan pun, sayang 💜')};
document.querySelectorAll('.flip').forEach(card=>card.onclick=()=>{card.setAttribute('aria-expanded',String(card.getAttribute('aria-expanded')!=='true'))});
let caught=0;function startGame(){caught=0;$('#progress-text').textContent='0 dari 5 hati';$('#dots').textContent='○ ○ ○ ○ ○';$('#secret').hidden=true;$('#game-caption').hidden=false;$('#replay').hidden=true;document.querySelectorAll('.heart-target').forEach(h=>h.remove());const positions=[[12,17],[65,12],[38,40],[10,65],[71,63]];positions.forEach(([x,y],i)=>{const h=document.createElement('button');h.className='heart-target';h.textContent='♥';h.setAttribute('aria-label','Tangkap hati '+(i+1));h.style.left=x+'%';h.style.top=y+'%';h.style.animationDelay=(-i*.4)+'s';h.onclick=e=>{h.remove();caught++;burst(e.clientX||innerWidth/2,e.clientY||innerHeight/2,8);$('#progress-text').textContent=caught+' dari 5 hati';$('#dots').textContent=Array.from({length:5},(_,j)=>j<caught?'♥':'○').join(' ');if(caught===5){$('#secret').hidden=false;$('#game-caption').hidden=true;$('#replay').hidden=false;$('#replay').focus({preventScroll:true});burst();toast('Semua hati memang buat kamu 💜')}};$('#playground').append(h)})}startGame();$('#replay').onclick=startGame;
let hugs=0;$('#hug').onclick=e=>{hugs++;burst(e.clientX||innerWidth/2,e.clientY||innerHeight/2);const messages=['Sini, aku peluk. Kamu sudah hebat hari ini 💜','Peluk lagi. Kali ini agak lama, ya 🫂','Nggak apa-apa capek. Kamu nggak harus kuat terus 💜','Sending you the warmest hug, sayang ♡'];$('#hug-message').textContent=messages[(hugs-1)%messages.length];$('#hug').innerHTML='Peluk lagi ('+hugs+') <span>♡</span>'};
let audio,playing=false,timer;const melody=[261.63,329.63,392,523.25,440,392,329.63,293.66,261.63,329.63,392,440,392,329.63,293.66,261.63];let note=0;function playNote(){const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.value=melody[note++%melody.length];const now=audio.currentTime;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.045,now+.05);gain.gain.exponentialRampToValueAtTime(.001,now+1.2);osc.connect(gain);gain.connect(audio.destination);osc.start(now);osc.stop(now+1.3)}function stopMusic(){playing=false;clearInterval(timer);if(audio)audio.suspend();$('#music').setAttribute('aria-pressed','false');$('#music').setAttribute('aria-label','Nyalakan musik lembut');$('#music span').textContent='musik off'}$('#music').onclick=async()=>{try{if(playing){stopMusic();return}audio??=new(window.AudioContext||window.webkitAudioContext)();await audio.resume();playing=true;playNote();timer=setInterval(playNote,650);$('#music').setAttribute('aria-pressed','true');$('#music').setAttribute('aria-label','Matikan musik lembut');$('#music span').textContent='musik on'}catch{stopMusic();toast('Musiknya belum bisa diputar di browser ini 💜')}};document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stopMusic()});

/* A little secret, unlocked only by the hundredth hug. */
const keepsake = document.createElement('dialog');
keepsake.className = 'hundred-hugs';
keepsake.setAttribute('aria-labelledby', 'hundred-title');
keepsake.innerHTML = `
  <button class="close" aria-label="Tutup kejutan">×</button>
  <div class="hundred-stars" aria-hidden="true">✧ &nbsp; ♡ &nbsp; ✦ &nbsp; ♡ &nbsp; ✧</div>
  <p class="section-label">A SECRET ONLY YOU COULD FIND</p>
  <div class="hundred-heart" aria-hidden="true">💜</div>
  <p class="hundred-count">100 peluk kecil. Satu kamu yang istimewa.</p>
  <h2 id="hundred-title">Sinta, you are<br><em>my soft place.</em></h2>
  <p class="hundred-copy">Kamu beneran sampai di sini? 🥺<br>Aku sembunyiin sesuatu, khusus buat kamu.</p>
  <button class="primary hundred-unseal">Buka rahasia terakhir <span>♡</span></button>
  <div class="hundred-letter" hidden>
    <p>Sayang,</p>
    <p>Kalau 100 kali klik bisa bikin kamu merasa dipeluk, bayangin berapa banyak peluk yang pengin aku kasih waktu ketemu kamu.</p>
    <p>Di hari yang seru, aku mau ikut ketawa sama kamu. Di hari yang berat, aku mau jadi tempat kamu cerita. Dan di hari yang biasa aja, aku tetap mau ada kamu.</p>
    <p class="hundred-promise">Kalau dunia lagi terlalu ramai,<br>kamu boleh pulang ke pelukku.</p>
    <p>Nggak ada hadiah yang lebih manis dari punya kamu di hidupku. Dari semua kejutan di halaman ini, kamu tetap kejutan paling indah buat aku.</p>
    <p class="handwritten">My girl. My favorite. My Sinta.<br>— Allief ♡</p>
    <div class="hundred-ticket"><span>♡ &nbsp; KUPON PELUK TANPA BATAS</span><small>Untuk Sinta Rahmawati · berlaku setiap hari<br>Ditukar langsung ke Allief. Nggak ada kedaluwarsa.</small></div>
    <button class="primary hundred-accept">Aku simpan di hati <span>💜</span></button>
  </div>
`;
document.body.append(keepsake);
const hundredStyles = document.createElement('style');
hundredStyles.textContent = `
.hundred-hugs { width:min(620px,calc(100% - 28px)); text-align:center; padding:44px 36px; background:radial-gradient(ellipse at top,#e9d7ff,transparent 65%),#fcf9ff; border:1px solid #ccb0e8; }
.hundred-hugs::backdrop { background:#241035aa; backdrop-filter:blur(10px); }
.hundred-stars { color:#9f73c4; font-size:25px; letter-spacing:.12em; margin-bottom:24px; }
.hundred-heart { font-size:74px; margin:20px 0 14px; animation:hundred-beat 1.8s ease-in-out infinite; }
.hundred-count { color:#88609e; font-size:13px; }
.hundred-hugs h2 { font-size:clamp(35px,7vw,53px); margin:18px 0; }
.hundred-copy { font-size:16px; line-height:1.8; color:#7b628b; margin-bottom:26px; }
.hundred-letter { text-align:left; font-size:16px; line-height:1.85; color:#705980; animation:hundred-reveal .65s ease both; }
.hundred-letter>p:first-child { font-family:'DM Serif Display',Georgia,serif; font-size:27px; color:#643591; }
.hundred-promise { text-align:center; font-family:'DM Serif Display',Georgia,serif; font-size:clamp(25px,5vw,32px); line-height:1.4; color:#7543ad; padding:20px 0; }
.hundred-letter .handwritten { text-align:center; font-size:26px; line-height:1.5; margin:28px 0; }
.hundred-ticket { border:1px dashed #b28bce; border-radius:14px; background:#eadbf7; padding:22px 14px; text-align:center; margin:26px 0; }
.hundred-ticket>span { display:block; font-size:13px; letter-spacing:.09em; color:#683d90; font-weight:600; }
.hundred-ticket small { display:block; margin-top:12px; font-size:13px; line-height:1.8; }
.hundred-accept { display:flex; margin:0 auto; }
.hundred-reopen { display:block; margin:16px auto 0; border:1px solid #c3a4d9; border-radius:30px; padding:11px 19px; color:#704196; background:#fbf8ff; font-size:14px; }
@keyframes hundred-beat { 0%,100% { transform:scale(1); } 40% { transform:scale(1.12); } 55% { transform:scale(1); } 70% { transform:scale(1.07); } }
@keyframes hundred-reveal { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@media(max-width:600px) { .hundred-hugs { padding:36px 22px; } .hundred-letter { font-size:15px; } }
@media(prefers-reduced-motion:reduce) { .hundred-heart,.hundred-letter { animation:none; } }
`;
document.head.append(hundredStyles);
const reopen = document.createElement('button');
reopen.className = 'hundred-reopen';
reopen.hidden = true;
reopen.textContent = 'Buka lagi rahasia kita ♡';
$('#hug-message').after(reopen);
function showHundredHugs() {
  keepsake.showModal();
  burst(innerWidth/2, innerHeight*.65, 60);
}
keepsake.querySelector('.close').onclick = () => keepsake.close();
keepsake.addEventListener('click', e => {
  if(e.target !== keepsake) return;
  const r=keepsake.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) keepsake.close();
});
keepsake.querySelector('.hundred-unseal').onclick = () => {
  keepsake.querySelector('.hundred-copy').hidden = true;
  keepsake.querySelector('.hundred-unseal').hidden = true;
  keepsake.querySelector('.hundred-letter').hidden = false;
  keepsake.querySelector('.hundred-accept').focus({preventScroll:true});
  burst(innerWidth/2,innerHeight*.7,40);
};
keepsake.querySelector('.hundred-accept').onclick = () => {
  keepsake.close();
  $('#hug-message').textContent = '100 peluk cuma awal. Sisanya, aku kasih langsung ya 💜';
  toast('Rahasia kecil kita, sekarang milik kamu 💜');
  burst();
};
reopen.onclick = showHundredHugs;
const regularHug = $('#hug').onclick;
$('#hug').onclick = e => {
  regularHug(e);
  if(hugs===100) {
    reopen.hidden = false;
    $('#hug-message').textContent = 'Psst… kamu menemukan sesuatu yang aku sembunyikan 💜';
    showHundredHugs();
  }
};
