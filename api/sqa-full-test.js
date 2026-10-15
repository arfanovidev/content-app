const http = require('http');

const BASE = 'http://localhost:4000/api';
let pass = 0, fail = 0;
const results = [];

function log(name, status, expected, msg) {
  const ok = status === expected;
  const icon = ok ? '✅' : '❌';
  console.log(`${icon} ${name} — got ${status}, expect ${expected}${msg ? ' (' + msg + ')' : ''}`);
  if (ok) pass++; else fail++;
  results.push({ name, status, expected, ok });
}

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
  console.log('🎯 SQA — Full Functional Test\n');

  // ============ CONTENTS ============
  console.log('📝 Contents Module\n');
  let r;

  r = await req('GET', '/contents');
  log('GET /contents (empty/list)', r.status, 200);

  r = await req('POST', '/contents', {});
  log('POST /contents (no auth)', r.status, 401);

  // Login first
  r = await req('POST', '/auth/login', { username: 'admin', password: 'NewStr0ngP@ss2026!' });
  log('POST /auth/login (valid)', r.status, 200);
  const token = r.data.accessToken;

  // Valid create
  r = await req('POST', '/contents', {
    title: { en: 'SQA Test ' + Date.now(), bn: 'টেস্ট' },
    shortDescription: { en: 'test', bn: 'টেস্ট' },
    categoryId: 'technology',
    tags: ['test'],
    coverImage: 'https://placehold.co/400',
    quillDelta: { ops: [{ insert: 'test\n' }] },
    readTime: 4,
    lang: 'en',
    author: 'SQA',
  }, token);
  log('POST /contents (valid auth)', r.status, 201);
  const createdId = r.data.id;
  const createdSlug = r.data.slug;

  // Missing title
  r = await req('POST', '/contents', { categoryId: 'test' }, token);
  log('POST /contents (missing title)', r.status, 400);

  // Get by slug
  r = await req('GET', '/contents/' + createdSlug);
  log('GET /contents/:slug (valid)', r.status, 200);

  // Get invalid
  r = await req('GET', '/contents/invalid-slug-xyz');
  log('GET /contents/:slug (invalid)', r.status, 404);

  // Update
  r = await req('PUT', '/contents/' + createdId, { readTime: 8 }, token);
  log('PUT /contents/:id', r.status, 200);

  // Delete
  r = await req('DELETE', '/contents/' + createdId, null, token);
  log('DELETE /contents/:id', r.status, 200);

  // Delete again
  r = await req('DELETE', '/contents/' + createdId, null, token);
  log('DELETE /contents/:id (2nd)', r.status, 404);

  // ============ AUTH ============
  console.log('\n🔐 Auth Module\n');

  r = await req('POST', '/auth/login', { username: 'admin', password: 'wrong' });
  log('POST /auth/login (wrong pw)', r.status, 401);

  r = await req('POST', '/auth/login', { username: 'admin' });
  log('POST /auth/login (no pw)', r.status, 400);

  r = await req('GET', '/auth/me', null, token);
  log('GET /auth/me (with token)', r.status, 200);

  r = await req('GET', '/auth/me');
  log('GET /auth/me (no token)', r.status, 401);

  r = await req('GET', '/auth/me', null, 'invalid.token.here');
  log('GET /auth/me (bad token)', r.status, 401);

  // ============ CATEGORIES ============
  console.log('\n📂 Categories Module\n');

  r = await req('GET', '/categories');
  log('GET /categories (list)', r.status, 200);

  r = await req('POST', '/categories', {});
  log('POST /categories (no auth)', r.status, 401);

  r = await req('GET', '/categories/technology');
  log('GET /categories/technology', r.status, 200);

  r = await req('GET', '/categories/invalid-cat');
  log('GET /categories/:invalid', r.status, 404);

  // ============ WEATHER ============
  console.log('\n🌤️  Weather Module\n');

  r = await req('GET', '/weather?lat=23.81&lon=90.41');
  log('GET /weather (Dhaka)', r.status, 200);

  r = await req('GET', '/weather?lat=200&lon=90');
  log('GET /weather (invalid lat)', r.status, 400);

  r = await req('GET', '/weather');
  log('GET /weather (no params)', r.status, 400);

  // ============ UPLOAD ============
  console.log('\n📤 Upload Module\n');

  r = await req('POST', '/upload/image', null);
  log('POST /upload/image (no auth)', r.status, 401);

  // ============ COMPLETED ============
  console.log('\n✅ Completed Module\n');

  const userKey = 'sqa-user-' + Date.now();

  r = await req('GET', `/completed?userKey=${userKey}`);
  log('GET /completed (empty)', r.status, 200);

  r = await req('POST', '/completed', {
    contentId: 'test-content-xyz',
    userKey,
    readDuration: 300,
  });
  log('POST /completed', r.status, 201);

  r = await req('POST', '/completed', {
    contentId: 'test-content-xyz',
    userKey,
    readDuration: 300,
  });
  log('POST /completed (duplicate)', r.status, 409);

  r = await req('GET', `/completed?userKey=${userKey}`);
  log('GET /completed (has 1)', r.status, 200);

  r = await req('DELETE', `/completed/test-content-xyz?userKey=${userKey}`);
  log('DELETE /completed/:id', r.status, 200);

  // ============ VOTES ============
  console.log('\n🗳️  Votes Module\n');

  const voteContent = 'sqa-vote-' + Date.now();

  r = await req('POST', '/votes', { contentId: voteContent, userKey, value: 1 });
  log('POST /votes (up)', r.status, 200);

  r = await req('POST', '/votes', { contentId: voteContent, userKey, value: -1 });
  log('POST /votes (change)', r.status, 200);

  r = await req('POST', '/votes', { contentId: voteContent, userKey, value: 5 });
  log('POST /votes (invalid value)', r.status, 400);

  r = await req('GET', `/votes/${voteContent}?userKey=${userKey}`);
  log('GET /votes/:id (with user)', r.status, 200);

  // ============ SUMMARY ============
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total: ${pass + fail} tests`);
  console.log(`Passed: ${pass} ✅`);
  console.log(`Failed: ${fail} ❌`);
  console.log(`Success rate: ${Math.round((pass/(pass+fail))*100)}%`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (fail === 0) console.log('\n🎉 ALL TESTS PASSED!');
  else console.log('\n⚠️ Some tests failed — check above');
})();
