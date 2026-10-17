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

  if (login.status !== 200) {
    console.log('Login failed:', login.status, login.data);
    return;
  }

  const token = login.data.accessToken;
  console.log('Logged in\n');

  const list = await req('GET', '/contents');
  console.log('Total contents:', list.data.length, '\n');

  const shorten = ['Morning Routine', 'AI in 2026', 'Small Business Ideas'];
  const tenSeconds = 0.1667;

  console.log('Setting 3 contents to 10 sec...\n');
  let count = 0;

  for (const c of list.data) {
    const isTarget = shorten.some((t) => c.title.en.includes(t));
    if (!isTarget) continue;

    const res = await req('PUT', '/contents/' + c.id, {
      readTime: tenSeconds,
    }, token);

    if (res.status === 200) {
      console.log('  OK:', c.title.en, '→ readTime:', res.data?.readTime);
      count++;
    } else {
      console.log('  FAIL:', c.title.en, '→', res.status, res.data);
    }
  }

  console.log('\nUpdated', count, 'contents');
  console.log('Now refresh browser (F5)');
})();
