const http = require('http');

async function req(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const headers = {};
    if (data) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(data);
    }
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const r = http.request({ hostname: 'localhost', port: 4000, path: '/api' + path, method, headers }, (res) => {
      let raw = '';
      res.on('data', (c) => (raw += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, data: raw }); }
      });
    });
    r.on('error', reject);
    if (data) r.write(data);
    r.end();
  });
}

(async () => {
  const login = await req('POST', '/auth/login', { username: 'admin', password: 'NewStr0ngP@ss2026!' });
  const token = login.data.accessToken;

  const list = await req('GET', '/contents');
  console.log('Total:', list.data.length);

  // Keep only unique by title.en
  const seen = new Set();
  const toDelete = [];
  for (const c of list.data) {
    if (seen.has(c.title.en)) {
      toDelete.push(c.id);
    } else {
      seen.add(c.title.en);
    }
  }

  console.log('Duplicates to delete:', toDelete.length);

  for (const id of toDelete) {
    const res = await req('DELETE', '/contents/' + id, null, token);
    console.log('  Deleted:', id, res.status);
  }

  const final = await req('GET', '/contents');
  console.log('Final count:', final.data.length);
})();
