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

/* Same secret doors, different letters when Jakarta's clock says it's time.
   ?preview=night | anniversary | january10 | day (local preview only). */
function jakartaMoment(date=new Date()){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jakarta',month:'numeric',day:'numeric',hour:'numeric',hourCycle:'h23'}).formatToParts(date);
 const values=Object.fromEntries(parts.map(p=>[p.type,p.value]));
 return {month:Number(values.month),day:Number(values.day),hour:Number(values.hour)};
}
function secretSeason(moment){
 return {night:moment.hour>=21||moment.hour<4,anniversary:moment.day===10,annual:moment.day===10&&moment.month===1};
}
const previewMode=new URLSearchParams(location.search).get('preview');
const previewMoments={night:{month:10,day:1,hour:21},anniversary:{month:10,day:10,hour:12},january10:{month:1,day:10,hour:12},day:{month:10,day:1,hour:12}};
const ordinaryRoomWords=[...roomWords];
const ordinaryStarWords=[...starWords];
const roomHeading=room.querySelector('h2');
const roomIntro=room.querySelector('h2 + p');
const roomEyebrow=room.querySelector('.section-label');
const normalRoomHeading=roomHeading.innerHTML,normalRoomIntro=roomIntro.innerHTML,normalRoomEyebrow=roomEyebrow.textContent;
const nightLetter='Sinta, sebelum kamu tidur: terima kasih sudah melewati hari ini. Kalau ada yang terasa berat, semoga malam ini memberi kamu sedikit tenang. Istirahat ya, sayang. Kamu nggak harus menyelesaikan semuanya malam ini. Aku sayang kamu. Selamat tidur 💜';
let currentSeason='';
function refreshTimedSecrets(){
 const season=secretSeason(previewMoments[previewMode]||jakartaMoment());
 const key=JSON.stringify(season);
 if(key===currentSeason)return;
 currentSeason=key;
 starWords.splice(0,starWords.length,...ordinaryStarWords);
 if(season.night)starWords[5]=nightLetter;
 const stars=sky.querySelectorAll('.secret-star');
 stars.forEach((star,i)=>{star.onclick=()=>{sky.querySelector('.star-message').textContent=starWords[i];star.classList.add('visited')}});
 sky.querySelector('.star-message').textContent='Setiap bintang menyimpan sesuatu yang ingin aku bilang.';
 if(season.anniversary){
  roomEyebrow.textContent=season.annual?'JANUARY 10 · OUR LITTLE DAY':'THE TENTH · OUR LITTLE DAY';
  roomHeading.innerHTML=season.annual?'10 Januari.<br><em>Hari kita.</em>':'Tanggal sepuluh.<br><em>Aku pilih kamu lagi.</em>';
  roomIntro.innerHTML='Ada tanggal yang buat orang lain biasa aja.<br>Tapi buat aku, tanggal ini punya kamu di dalamnya.';
  roomWords.splice(0,roomWords.length,
   season.annual?'Happy anniversary, Sinta Rahmawati 💜 10 Januari selalu jadi tanggal yang terasa lebih hangat, karena di situ ada awal cerita kita.':'Happy tanggal sepuluh, sayang 💜 Hari kecil kita datang lagi. Aku pengin berhenti sebentar dan bilang: aku senang punya kamu.',
   'Aku nggak ingin cuma ingat tanggal kita mulai. Aku juga ingin terus ingat alasan kenapa aku mau berjalan sama kamu.',
   'Terima kasih untuk obrolan, tawa, dan hari-hari kecil yang kita bagi. Hal-hal itu mungkin kelihatan sederhana, tapi berharga buat aku.',
   'Semoga kita terus belajar saling dengar, saling jaga, dan tetap memilih satu sama lain, bahkan saat hari nggak selalu mudah.',
   'Dari 10 Januari, sampai tanggal-tanggal yang belum kita temui: aku masih pengin bikin cerita sama kamu. — Allief ♡');
 }else{
  roomEyebrow.textContent=normalRoomEyebrow;roomHeading.innerHTML=normalRoomHeading;roomIntro.innerHTML=normalRoomIntro;
  roomWords.splice(0,roomWords.length,...ordinaryRoomWords);
 }
 roomIndex=0;renderRoom();
}
refreshTimedSecrets();
setInterval(refreshTimedSecrets,1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshTimedSecrets()});
if(previewMoments[previewMode]){
 const previewBadge=document.createElement('div');
 previewBadge.textContent='PREVIEW: '+previewMode+' · hapus ?preview untuk waktu asli';
 previewBadge.setAttribute('role','status');
 previewBadge.style.cssText='position:fixed;left:12px;bottom:12px;z-index:50;background:#352047;color:white;padding:10px 14px;border-radius:12px;font:12px sans-serif;max-width:calc(100vw - 24px)';
 document.body.append(previewBadge);
 if(previewMode==='night'){
  sky.showModal();
  sky.querySelector('.star-message').textContent=nightLetter;
 }else if(previewMode==='anniversary'||previewMode==='january10')room.showModal();
}

/* Seasonal secrets have their own rooms, not just different text. */
const seasonalCSS=document.createElement('style');
seasonalCSS.textContent=`
.seasonal{width:min(650px,calc(100% - 28px));padding:40px 30px;text-align:center;max-height:88dvh}
.seasonal h2{font-size:clamp(34px,7vw,54px);line-height:1.15}.seasonal p{line-height:1.85}
.bedtime{background:radial-gradient(ellipse at 80% 0,#544272,#17172f 70%);color:#eee9ff;border-color:#796893}
.bedtime::backdrop{background:#101023d9}.bedtime .close{color:#d7c8ef}.bedtime .section-label{color:#bba9d8}
.bedtime em{color:#dcc1ff}.bedtime .moon{font-size:65px;margin:12px 0}.bedtime .night-intro{color:#c6bedb}
.bedtime .night-letter{background:#ffffff08;border:1px solid #ffffff15;border-radius:24px;padding:22px;text-align:left;color:#dbd4ea}
.bedtime .primary{background:#d8c5f1;color:#30233f;box-shadow:0 8px 32px #d3b5ff15}
.bedtime .rest-note{font-family:'Give You Glory',cursive;font-size:26px;color:#d9c2ef}
.month-party{background:#fff4fa;color:#683b63;border:1px solid #e7bfd8}
.month-party::backdrop{background:#543047a8}.month-party .section-label{color:#a65a87}.month-party em{color:#a04a82}
.party-ribbon{display:inline-block;background:#edd9f0;border:1px solid #d8b6de;padding:8px 20px;border-radius:30px;font-size:13px;letter-spacing:.12em}
.party-symbol{font-size:58px;margin:18px 0}.party-card{background:white;border:1px solid #edd6e4;border-radius:18px;padding:24px;box-shadow:5px 6px 0 #f0dfeb;text-align:left;transform:rotate(-1deg);margin:25px 0}
.party-card h3{font-size:28px;margin:0;color:#8d477a}.party-card p{color:#926280}.party-wish{background:#eee0f7;border-radius:16px;padding:20px;margin-top:22px;font-size:18px;color:#70437d}
.month-party .primary{background:#9d5186}.month-party .handwritten{font-size:26px;color:#a15e8e}
.our-book{background:#fcf4e9;color:#583c53;border:1px solid #d8b8bd;padding:0}
.our-book::backdrop{background:#38202cae}.our-book .close{z-index:1;color:#704057}
.book-cover{background:#765078;color:#fff3ef;padding:45px 28px;border-bottom:5px solid #d6b9cc}
.book-cover .section-label{color:#edd3e7}.book-cover em{color:#f3cbdc}
.book-date{font-family:'DM Serif Display',Georgia,serif;font-size:75px;line-height:1;margin:24px 0 8px}
.book-cover .book-month{letter-spacing:.25em;font-size:13px;margin:0}.book-cover h2{font-size:36px}
.book-pages{padding:30px;text-align:left}.book-page-number{font-size:12px;letter-spacing:.15em;color:#a57b90}
.book-pages h3{font-size:30px;color:#784e70;margin:16px 0}.book-pages p{font-size:16px;color:#856b7d}
.book-line{height:1px;background:#dfcbd5;margin:25px 0}.book-pages .primary{display:flex;margin:25px auto 0;background:#765078}
.book-ending{font-family:'Give You Glory',cursive;text-align:center;font-size:28px!important;color:#815379!important}
@media(max-width:600px){.seasonal{padding:35px 22px}.our-book{padding:0}.book-pages{padding:25px 22px}.party-card{padding:20px}}
`;
document.head.append(seasonalCSS);
const bedtime=secretDialog('seasonal bedtime',`
 <div class="moon" aria-hidden="true">☾</div>
 <p class="section-label">A SOFT PLACE TO END YOUR DAY</p>
 <h2>Udah malam,<br><em>sayang.</em></h2>
 <p class="night-intro">Nggak usah buru-buru. Di sini, kamu boleh istirahat.</p>
 <div class="night-letter"><p>Sinta, terima kasih sudah melewati hari ini.</p><p>Kalau hari ini rasanya berat, taruh dulu sebentar. Kamu nggak harus menyelesaikan semuanya malam ini. Kamu juga nggak perlu selalu kuat untuk layak disayang.</p><p>Semoga tidurmu tenang, mimpimu manis, dan besok terasa sedikit lebih ringan. Aku titip satu peluk sebelum kamu merem, ya 💜</p></div>
 <p class="rest-note">Rest your little heart. I'm here. ♡</p>
 <button class="primary night-tuck">Selimutin aku <span>♡</span></button>
 <p class="night-goodnight" aria-live="polite" hidden></p>`);
bedtime.setAttribute('aria-label','Surat sebelum tidur untuk Sinta');
bedtime.querySelector('.night-tuck').onclick=()=>{bedtime.querySelector('.night-tuck').hidden=true;const p=bedtime.querySelector('.night-goodnight');p.hidden=false;p.textContent='Selimutnya sudah ditarik. Peluknya sudah dititipkan. Selamat tidur, kesayanganku 🫂💜';burst(innerWidth/2,innerHeight*.7,12)};
const monthly=secretDialog('seasonal month-party',`
 <div class="party-ribbon">THE TENTH · OUR MINI CELEBRATION</div>
 <div class="party-symbol" aria-hidden="true">🎀</div>
 <h2>Happy tanggal 10,<br><em>kesayanganku!</em></h2>
 <p>Hari kecil kita datang lagi.<br>Aku siapin perayaan mungil buat kamu.</p>
 <div class="party-card"><h3>Satu tanggal. Banyak rasa.</h3><p>Aku senang punya kamu buat berbagi cerita, ketawa karena hal random, dan menikmati hari-hari kecil yang mungkin biasa buat orang lain.</p><p>Hari ini aku cuma mau bilang: dari semua hal yang berubah, aku masih pengin memilih kamu. Lagi dan lagi. 💜</p></div>
 <button class="primary party-open">Buka hadiah kecilnya <span>♡</span></button>
 <div class="party-wish" hidden><strong>Hadiahmu: satu ajakan sederhana 🥺</strong><p>Yuk, sisihin waktu buat kita. Nggak harus mewah. Cerita panjang, ketawa bareng, dan saling dengerin juga sudah bikin aku senang.</p><p class="handwritten">My favorite little tradition is us. ♡</p></div>`);
monthly.setAttribute('aria-label','Perayaan bulanan tanggal sepuluh');
monthly.querySelector('.party-open').onclick=()=>{monthly.querySelector('.party-open').hidden=true;monthly.querySelector('.party-wish').hidden=false;burst(innerWidth/2,innerHeight*.65,45)};
const annual=secretDialog('seasonal our-book',`
 <div class="book-cover"><p class="section-label">A LITTLE BOOK ABOUT US</p><div class="book-date">10</div><p class="book-month">JANUARI</p><h2>Hari kita.<br><em>Awal cerita favoritku.</em></h2><p>For Sinta Rahmawati, with love.</p></div>
 <div class="book-pages"><div class="book-page-number"></div><h3 class="book-chapter"></h3><p class="book-story"></p><div class="book-line"></div><p class="book-ending"></p><button class="primary book-next">Buka halaman berikutnya <span>♡</span></button></div>`);
annual.setAttribute('aria-label','Buku anniversary sepuluh Januari');
const chapters=[
 ['Awalnya, ada kita.','10 Januari bukan cuma angka di kalender. Buat aku, itu awal cerita yang punya kamu di dalamnya. Cerita yang sampai sekarang masih ingin aku lanjutkan.','Happy anniversary, my girl. ♡'],
 ['Yang kecil, yang berharga.','Obrolan yang nggak direncanakan. Tawa karena hal sederhana. Waktu yang kita bagi. Terima kasih sudah jadi bagian dari hari-hariku, Sinta. Aku menyimpan hal-hal kecil itu dengan sayang.','Little moments, a whole lot of love.'],
 ['Halaman yang belum ditulis.','Aku nggak tahu semua hal yang menunggu kita. Tapi aku ingin terus belajar mendengarkanmu, menjagamu, dan membuat cerita baru sama kamu. Dari 10 Januari, sampai tanggal-tanggal yang belum kita temui.','Still you. Still us. — Allief ♡']
];
let chapter=0;function renderBook(){annual.querySelector('.book-page-number').textContent='BAB '+(chapter+1)+' / 3';annual.querySelector('.book-chapter').textContent=chapters[chapter][0];annual.querySelector('.book-story').textContent=chapters[chapter][1];annual.querySelector('.book-ending').textContent=chapters[chapter][2];annual.querySelector('.book-next').innerHTML=chapter===2?'Baca cerita kita lagi <span>♡</span>':'Buka halaman berikutnya <span>♡</span>'}
annual.querySelector('.book-next').onclick=()=>{chapter=(chapter+1)%chapters.length;renderBook()};renderBook();
function activeSeason(){return secretSeason(previewMoments[previewMode]||jakartaMoment())}
function openSeasonalRoom(){const season=activeSeason();if(season.annual){chapter=0;renderBook();annual.showModal()}else if(season.anniversary){monthly.showModal()}else{roomIndex=0;renderRoom();room.showModal()}burst(innerWidth/2,innerHeight*.6,30)}
const footerSecret=document.querySelector('footer .secret-trigger');
if(footerSecret){let hits=0,resetHits;footerSecret.onclick=()=>{clearTimeout(resetHits);if(++hits===5){hits=0;openSeasonalRoom()}else resetHits=setTimeout(()=>hits=0,5000)}}
function bindNightStar(){const star=sky.querySelectorAll('.secret-star')[5];if(star)star.onclick=()=>{star.classList.add('visited');if(activeSeason().night){sky.close();bedtime.showModal()}else sky.querySelector('.star-message').textContent=ordinaryStarWords[5]}}
bindNightStar();setInterval(bindNightStar,1100);
if(previewMode==='night'){if(sky.open)sky.close();bedtime.showModal()}
if(previewMode==='anniversary'||previewMode==='january10'){if(room.open)room.close();openSeasonalRoom()}
