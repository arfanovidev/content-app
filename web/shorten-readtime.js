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
  console.log('Login...');
  const login = await req('POST', '/auth/login', {
    username: 'admin',
    password: 'NewStr0ngP@ss2026!',
  });
  const token = login.data.accessToken;

  const list = await req('GET', '/contents');
  console.log('Total contents:', list.data.length);

  console.log('\nUpdating readTime to 5 sec (0.083 min)...');
  for (const c of list.data) {
    const res = await req('PUT', '/contents/' + c.id, {
      readTime: 0.083,
    }, token);
    console.log('  ', c.title.en, '→', res.status, '| readTime:', res.data?.readTime);
  }

  console.log('\nDone! Refresh browser & click any card.');
  console.log('Complete button will appear after ~5 seconds.');
})();
