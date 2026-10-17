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
  const login = await req('POST', '/auth/login', {
    username: 'admin', password: 'NewStr0ngP@ss2026!',
  });
  const token = login.data.accessToken;
  console.log('Login:', login.status);

  const cats = await req('GET', '/categories');
  console.log('Categories:', cats.data.length);
  const bySlug = (s) => cats.data.find((c) => c.slug === s);

  const samples = [
    { title: { en: 'AI in 2026', bn: '২০২৬ সালে এআই' }, desc: { en: 'Artificial intelligence beginner guide', bn: 'কৃত্রিম বুদ্ধিমত্তার সহজ গাইড' }, cat: 'technology', readTime: 5 },
    { title: { en: 'Daily Exercise', bn: 'প্রতিদিনের ব্যায়াম' }, desc: { en: 'Simple home workouts in 15 minutes', bn: '১৫ মিনিটে ঘরে সহজ ব্যায়াম' }, cat: 'health', readTime: 4 },
    { title: { en: 'Learn Coding Faster', bn: 'দ্রুত কোডিং শেখা' }, desc: { en: 'Proven methods for 2026', bn: '২০২৬ সালের প্রমাণিত পদ্ধতি' }, cat: 'education', readTime: 6 },
    { title: { en: 'Small Business Ideas', bn: 'ছোট ব্যবসার আইডিয়া' }, desc: { en: 'Low investment business ideas', bn: 'কম বিনিয়োগে ব্যবসার আইডিয়া' }, cat: 'business', readTime: 5 },
    { title: { en: 'Morning Routine', bn: 'সকালের রুটিন' }, desc: { en: 'Build productive morning habits', bn: 'ফলপ্রসূ সকালের অভ্যাস তৈরি' }, cat: 'lifestyle', readTime: 4 },
  ];

  for (const s of samples) {
    const cat = bySlug(s.cat);
    if (!cat) {
      console.log('  Category not found:', s.cat);
      continue;
    }
    const res = await req('POST', '/contents', {
      title: s.title,
      shortDescription: s.desc,
      categoryId: cat.id,
      tags: ['demo', '2026'],
      coverImage: 'https://placehold.co/600x400/1e40af/ffffff?text=' + encodeURIComponent(s.title.en.replace(/\s/g, '+')),
      quillDelta: { ops: [{ insert: s.title.bn + '\n' }] },
      readTime: s.readTime,
      lang: 'bn',
      author: 'Ovi',
    }, token);
    console.log('  ', s.title.bn, '→', res.status);
  }

  const list = await req('GET', '/contents');
  console.log('\nTotal contents now:', list.data.length);
})();
