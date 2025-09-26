//========PASSWORDKU========//
const PLAIN_PASSWORD = 'H021231041';  
const SESSION_KEY = 'elins_portal_unlocked';


async function sha256(text){
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

let PASSWORD_HASH = null;
(async () => { PASSWORD_HASH = await sha256(PLAIN_PASSWORD); })();

const pwd = document.getElementById('pwd');
const btn = document.getElementById('enter');
const err = document.getElementById('err');
const links = document.getElementById('links');
const toggle = document.getElementById('toggle');

// Tampilkan/sembunyikan password
toggle.addEventListener('click', () => {
  const shown = pwd.type === 'text';
  pwd.type = shown ? 'password' : 'text';
  toggle.textContent = shown ? 'Tampilkan' : 'Sembunyikan';
  pwd.focus();
});

// Jika sudah login sebelumnya
if (sessionStorage.getItem(SESSION_KEY) === '1') {
  links.style.display = 'block';
}

async function tryLogin() {
  err.textContent = '';
  const val = pwd.value || '';
  const valHash = await sha256(val);
  if (PASSWORD_HASH && valHash === PASSWORD_HASH) {
    links.style.display = 'block';
    sessionStorage.setItem(SESSION_KEY, '1');
    pwd.value = '';
  } else {
    err.textContent = 'Kata sandi salah. Coba lagi.';
  }
}

btn.addEventListener('click', tryLogin);
pwd.addEventListener('keydown', (e)=>{ if(e.key==='Enter') tryLogin(); });
