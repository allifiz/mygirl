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

/* Two quiet doors into Sinta's little universe. */
const secretStyle=document.createElement('style');
secretStyle.textContent=`
.secret-trigger{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none}
.name-trigger{font-style:italic;color:var(--purple);font-size:1.18em;line-height:inherit;letter-spacing:inherit;transition:filter .3s}
.name-trigger.holding{filter:drop-shadow(0 0 14px #ab73d4)}
.secret-world{width:min(760px,calc(100% - 24px));padding:42px 28px;text-align:center;background:radial-gradient(ellipse at top,#60368d,#211330 75%);color:#fcf2ff;border:1px solid #9973ba;overflow:auto}
.secret-world::backdrop{background:#160b27dc;backdrop-filter:blur(12px)}
.secret-world .close{color:#e0c5fc}.secret-world .section-label{color:#ceb0ef}
.secret-world h2{font-size:clamp(32px,7vw,48px)}.secret-world em{color:#d8b5ff}
.secret-world>p{line-height:1.8;color:#ddc9ea}.secret-sky{position:relative;height:260px;margin:20px 0}
.secret-star{position:absolute;background:none;border:0;color:#f4daff;font-size:35px;min-width:48px;min-height:48px;animation:secret-twinkle 3s ease-in-out infinite}
.secret-star.visited{color:#bc8ded}.star-message{min-height:100px;display:grid;place-items:center;font-family:'DM Serif Display',Georgia,serif;font-size:24px;line-height:1.5;padding:20px;border:1px solid #9a71b54d;border-radius:16px;background:#ffffff08}
.secret-room{background:radial-gradient(ellipse at top,#ecd8ff,transparent 70%),#fcf8ff;color:var(--ink);width:min(590px,calc(100% - 28px))}
.secret-room .close{color:var(--purple)}.secret-room .section-label{color:var(--purple)}.secret-room em{color:var(--purple)}.secret-room>p{color:var(--muted)}
.room-note{font-family:'DM Serif Display',Georgia,serif;font-size:clamp(23px,5vw,29px);line-height:1.6;padding:25px 18px;border-top:1px solid #d9c0ed;border-bottom:1px solid #d9c0ed;margin:28px 0;min-height:185px;display:grid;place-items:center}
.room-counter{font-size:13px;color:#9570ae;letter-spacing:.08em}.secret-room .handwritten{color:var(--purple);font-size:27px}
@keyframes secret-twinkle{0%,100%{opacity:.65;transform:scale(.9)}50%{opacity:1;transform:scale(1.12)}}
@media(prefers-reduced-motion:reduce){.secret-star{animation:none}}
`;
document.head.append(secretStyle);
function secretDialog(className,content){
 const d=document.createElement('dialog');d.className='secret-world '+className;d.innerHTML='<button class="close" aria-label="Tutup kejutan">×</button>'+content;document.body.append(d);
 d.querySelector('.close').onclick=()=>d.close();
 d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});
 return d;
}
const sky=secretDialog('night-sky',`
 <p class="section-label">OUR LITTLE SECRET UNIVERSE</p>
 <h2>Ada dunia kecil,<br><em>yang isinya kamu.</em></h2>
 <p>Kamu menemukan tempat yang nggak semua orang bisa masuk.<br>Cuma kamu, Sinta. Ketuk bintangnya, ya.</p>
 <div class="secret-sky"></div>
 <div class="star-message" aria-live="polite">Setiap bintang menyimpan sesuatu yang ingin aku bilang.</div>
 <p class="handwritten">Even in a sky full of stars, I'd look for you. ♡</p>`);
sky.setAttribute('aria-label','Langit rahasia untuk Sinta');
const starWords=[
 'Kalau hariku punya bagian favorit, biasanya ada kamu di dalamnya.',
 'Aku suka saat cerita kecilmu berubah jadi obrolan panjang kita.',
 'Kamu nggak harus selalu ceria untuk tetap aku sayang.',
 'Ada banyak hal yang bisa bikin aku tersenyum. Tapi senyum karena kamu rasanya beda.',
 'Kalau boleh bikin satu permintaan malam ini: semoga kamu tahu betapa berharganya kamu buat aku.',
 'Semesta luas banget. Tapi aku senang jalan kita bisa ketemu.',
 'Bintang terakhir ini cuma mau bilang: aku pilih kamu, lagi dan lagi. 💜'
];
const starPlaces=[[8,20],[34,5],[68,12],[20,58],[51,42],[80,61],[48,79]];
starWords.forEach((words,i)=>{const s=document.createElement('button');s.className='secret-star';s.textContent='✦';s.setAttribute('aria-label','Buka pesan bintang '+(i+1));s.style.left=starPlaces[i][0]+'%';s.style.top=starPlaces[i][1]+'%';s.style.animationDelay=(-i*.4)+'s';s.onclick=()=>{sky.querySelector('.star-message').textContent=words;s.classList.add('visited')};sky.querySelector('.secret-sky').append(s)});
const oldName=document.querySelector('h1 em');
if(oldName){
 const name=document.createElement('button');name.className='secret-trigger name-trigger';name.textContent=oldName.textContent;name.setAttribute('aria-label','Sinta');oldName.replaceWith(name);
 let holdTimer,startPoint;function cancelHold(){clearTimeout(holdTimer);holdTimer=null;name.classList.remove('holding')}
 function openSky(){cancelHold();if(!sky.open){sky.showModal();burst(innerWidth/2,innerHeight*.6,35)}}
 name.addEventListener('pointerdown',e=>{if(e.isPrimary===false||e.button!==0)return;cancelHold();startPoint={x:e.clientX,y:e.clientY};name.classList.add('holding');holdTimer=setTimeout(openSky,3000)});
 name.addEventListener('pointermove',e=>{if(holdTimer&&startPoint&&Math.hypot(e.clientX-startPoint.x,e.clientY-startPoint.y)>15)cancelHold()});
 ['pointerup','pointercancel','pointerleave','blur'].forEach(event=>name.addEventListener(event,cancelHold));
 name.addEventListener('contextmenu',e=>e.preventDefault());
 name.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!e.repeat&&!holdTimer){name.classList.add('holding');holdTimer=setTimeout(openSky,3000)}}});
 name.addEventListener('keyup',cancelHold);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelHold()});
}
const room=secretDialog('secret-room',`
 <p class="section-label">YOU FOUND THE PART I KEPT QUIET</p>
 <h2>Hal-hal yang<br><em>belum aku bilang.</em></h2>
 <p>Nggak semua rasa langsung jadi kata.<br>Beberapa aku simpan di sini, buat kamu.</p>
 <div class="room-note" aria-live="polite"></div>
 <p class="room-counter"></p>
 <button class="primary room-next">Ada satu lagi <span>♡</span></button>
 <p class="handwritten">Just between us, Allief ♡ Sinta</p>`);
room.setAttribute('aria-label','Ruang pesan rahasia Allief dan Sinta');
const roomWords=[
 'Kadang aku pengin ngobrol sama kamu, padahal nggak ada topik. Aku cuma kangen kamu.',
 'Hal kecil darimu bisa tinggal lama di kepalaku. Cara kamu ketawa, cerita, atau sekadar manggil namaku.',
 'Aku nggak cuma mau ada di foto bahagiamu. Aku juga mau ada saat kamu butuh ditemani.',
 'Kalau aku bisa menitipkan satu perasaan lewat halaman ini, aku pengin kamu merasa: “aku disayang.”',
 'Kamu bukan sekadar nama di halaman ini, Sinta. Kamu alasan kenapa aku bikin semuanya dengan hati. 💜'
];
let roomIndex=0;
function renderRoom(){room.querySelector('.room-note').textContent=roomWords[roomIndex];room.querySelector('.room-counter').textContent=(roomIndex+1)+' / '+roomWords.length;room.querySelector('.room-next').innerHTML=roomIndex===roomWords.length-1?'Baca dari awal <span>♡</span>':'Ada satu lagi <span>♡</span>'}
room.querySelector('.room-next').onclick=()=>{roomIndex=(roomIndex+1)%roomWords.length;renderRoom()};renderRoom();
const footerTitle=document.querySelector('footer > span:first-child');
if(footerTitle){
 const door=document.createElement('button');door.className='secret-trigger';door.innerHTML=footerTitle.innerHTML;door.setAttribute('aria-label','Allief cinta Sinta');footerTitle.textContent='';footerTitle.append(door);
 let taps=0,tapTimer;
 door.onclick=()=>{clearTimeout(tapTimer);taps++;if(taps===5){taps=0;roomIndex=0;renderRoom();if(!room.open)room.showModal();burst(innerWidth/2,innerHeight*.6,35)}else tapTimer=setTimeout(()=>taps=0,5000)};
}
