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
    const r = http.request({ hostname: 'localhost', port: 4000, path, method, headers }, (res) => {
      let raw = '';
      res.on('data', (c) => raw += c);
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
  console.log('🔍 Backend Full Test\n');
  let pass = 0, fail = 0;

  // 1. Root
  const root = await req('GET', '/api');
  console.log('1. GET /api →', root.status, root.data === 'Hello World!' ? '✅' : '❌');
  root.status === 200 ? pass++ : fail++;

  // 2. Contents (public)
  const contents = await req('GET', '/api/contents');
  console.log('2. GET /api/contents →', contents.status, Array.isArray(contents.data) ? '✅' : '❌');
  contents.status === 200 ? pass++ : fail++;

  // 3. Categories (public)
  const cats = await req('GET', '/api/categories');
  console.log('3. GET /api/categories →', cats.status, 'Count:', cats.data.length, cats.status === 200 ? '✅' : '❌');
  cats.status === 200 ? pass++ : fail++;

  // 4. Weather (public)
  const weather = await req('GET', '/api/weather?lat=23.81&lon=90.41');
  console.log('4. GET /api/weather →', weather.status, weather.data.city ? `(${weather.data.city}, ${weather.data.temperature}°C) ✅` : '❌');
  weather.status === 200 ? pass++ : fail++;

  // 5. Login (with new password)
  const login = await req('POST', '/api/auth/login', { username: 'admin', password: 'NewStr0ngP@ss2026!' });
  console.log('5. POST /api/auth/login →', login.status, login.data.accessToken ? '✅' : '❌');
  login.status === 200 ? pass++ : fail++;
  const token = login.data.accessToken;

  // 6. Auth /me (protected)
  const me = await req('GET', '/api/auth/me', null, token);
  console.log('6. GET /api/auth/me (with token) →', me.status, me.data.username === 'admin' ? '✅' : '❌');
  me.status === 200 ? pass++ : fail++;

  // 7. Auth /me without token (should be 401)
  const noAuth = await req('GET', '/api/auth/me');
  console.log('7. GET /api/auth/me (no token) →', noAuth.status, noAuth.status === 401 ? '✅' : '❌');
  noAuth.status === 401 ? pass++ : fail++;

  // 8. Upload without token (should be 401)
  const upNoAuth = await req('POST', '/api/upload/image');
  console.log('8. POST /api/upload/image (no token) →', upNoAuth.status, upNoAuth.status === 401 ? '✅' : '❌');
  upNoAuth.status === 401 ? pass++ : fail++;

  // 9. Completed endpoint
  const comp = await req('GET', '/api/completed?userKey=health-check');
  console.log('9. GET /api/completed →', comp.status, Array.isArray(comp.data) ? '✅' : '❌');
  comp.status === 200 ? pass++ : fail++;

  // 10. Votes tally
  const votes = await req('GET', '/api/votes/test-content-xyz');
  console.log('10. GET /api/votes/:id →', votes.status, votes.data.score !== undefined ? '✅' : '❌');
  votes.status === 200 ? pass++ : fail++;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total: ${pass}/10 passed ✅`);
  if (fail === 0) console.log('🎉 BACKEND 100% WORKING!');
  else console.log(`⚠️ ${fail} failed — need attention`);
})();
