// Auto-connect to WS control server hosted on the Pi
const WS_URL = `ws://${location.hostname}:8081`;
const serverWS = new WebSocket(WS_URL);

// Persist a stable sessionId so the server can target this browser
const stored = localStorage.getItem('vei_session_id');
const sessionId = stored || (crypto.randomUUID());
if (!stored) localStorage.setItem('vei_session_id', sessionId);

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('sessionId');
  if (el) el.textContent = sessionId;
});

serverWS.onopen = () => {
  serverWS.send(JSON.stringify({ type: 'register', sessionId }));
  console.log('Registered with session:', sessionId);
};

serverWS.onmessage = async (event) => {
  const data = JSON.parse(event.data || '{}');
  if (data.type === 'runCartSequence' && Array.isArray(data.links)) {
    console.log('Running cart sequence with', data.links.length, 'items');

    // Use popup mode to keep this page alive (more reliable on Chromebooks)
    for (const link of data.links) {
      console.log('Opening:', link);
      const win = window.open(link, '_blank');
      if (!win) {
        alert('Popup blocked! Please allow popups for this site to add items.');
        return;
      }
      await sleep(1600);
    }

    // Open final cart
    window.open('https://portal.veinternational.org/buybuttons/us019814/cart/', '_blank');
  }
};

serverWS.onclose = () => {
  console.warn('Disconnected from control server');
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
