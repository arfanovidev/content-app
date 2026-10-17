import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DriveService } from './modules/drive/drive.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly driveService: DriveService,
  ) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getRoot(): string {
    const now = new Date().toISOString();
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Content API — Production Backend</title>
<meta name="description" content="Bilingual content platform API. Built with NestJS, JWT auth, Google Drive storage." />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%236366f1'/%3E%3Cstop offset='100%25' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='url(%23g)'/%3E%3Ctext x='16' y='22' font-family='-apple-system,sans-serif' font-size='18' font-weight='800' fill='white' text-anchor='middle'%3EC%3C/text%3E%3C/svg%3E" />
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',Roboto,sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased;font-size:15px}
body{min-height:100vh;opacity:0;transition:opacity 0.4s ease;padding:0}
body.loaded{opacity:1}
a{color:#818cf8;text-decoration:none;transition:color 0.15s}
a:hover{color:#a5b4fc;text-decoration:underline}
code{font-family:'SF Mono',Menlo,Monaco,'Courier New',monospace;font-size:0.9em;background:#1a1a1a;padding:2px 6px;border-radius:4px;color:#e5e5e5}
.container{max-width:800px;margin:0 auto;padding:48px 24px 80px}

/* LOADER */
#loader{position:fixed;inset:0;background:#0a0a0a;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;z-index:9999;transition:opacity 0.5s ease,visibility 0.5s ease}
#loader.hidden{opacity:0;visibility:hidden;pointer-events:none}
.loader-logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#ec4899);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;animation:pulse 1.5s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.loader-spinner{width:32px;height:32px;border-radius:50%;border:2px solid #262626;border-top-color:#6366f1;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loader-text{font-size:12px;color:#71717a;letter-spacing:0.1em;text-transform:uppercase}

/* HEADER */
header{padding-bottom:32px;border-bottom:1px solid #262626;margin-bottom:40px}
header .logo{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;margin-bottom:20px}
.logo-mark{width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#ec4899);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff}
.status{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#22c55e}
.status-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite}

/* HERO */
.hero{padding:20px 0 40px}
.hero h1{font-size:32px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;margin-bottom:16px;color:#fafafa}
.hero p{font-size:15px;color:#a1a1aa;margin-bottom:24px}
.hero-buttons{display:flex;gap:16px;flex-wrap:wrap}
.hero-buttons a{font-size:14px;font-weight:500}

/* SECTIONS */
section{padding:32px 0;border-top:1px solid #1f1f1f}
section:first-of-type{border-top:none;padding-top:0}
section h2{font-size:20px;font-weight:600;margin-bottom:16px;color:#fafafa}
section p{color:#a1a1aa;margin-bottom:20px;font-size:14px}

/* LIST */
ul.list{list-style:none;padding:0;margin:0}
ul.list li{padding:8px 0;color:#d4d4d8;font-size:14px;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:10px}
ul.list li:last-child{border-bottom:none}
ul.list li::before{content:'▸';color:#6366f1;font-size:12px}

/* ENDPOINTS */
.endpoint-group{margin-bottom:24px}
.endpoint-group-title{font-size:13px;font-weight:600;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px}
.endpoint{display:flex;align-items:center;gap:12px;padding:8px 0;font-size:13px;border-bottom:1px solid #1a1a1a;flex-wrap:wrap}
.endpoint:last-child{border-bottom:none}
.method{font-family:monospace;font-size:11px;font-weight:700;padding:2px 6px;border-radius:3px;min-width:48px;text-align:center}
.method.get{color:#22c55e;background:rgba(34,197,94,0.1)}
.method.post{color:#3b82f6;background:rgba(59,130,246,0.1)}
.method.put{color:#f59e0b;background:rgba(245,158,11,0.1)}
.method.delete{color:#ef4444;background:rgba(239,68,68,0.1)}
.endpoint-path{font-family:'SF Mono',Menlo,monospace;color:#e5e5e5;font-size:13px}
.endpoint-desc{color:#71717a;font-size:12px;margin-left:auto}

/* CODE */
pre.code{background:#141414;border:1px solid #262626;border-radius:8px;padding:16px;font-family:'SF Mono',Menlo,monospace;font-size:12px;line-height:1.6;color:#a1a1aa;overflow-x:auto;margin:16px 0}
pre.code .k{color:#93c5fd}
pre.code .s{color:#86efac}

/* TECH */
.tech-list{display:flex;flex-wrap:wrap;gap:8px}
.tech-tag{font-size:12px;padding:4px 10px;border-radius:6px;background:#1a1a1a;color:#a1a1aa;border:1px solid #262626}

/* FOOTER */
footer{padding-top:32px;margin-top:40px;border-top:1px solid #262626;font-size:12px;color:#71717a}
footer p{margin-bottom:6px}
footer a{font-size:12px}

@media(max-width:600px){
  .container{padding:32px 16px 60px}
  .hero h1{font-size:24px}
  .endpoint-desc{margin-left:0;width:100%}
}
</style>
</head>
<body>

<div id="loader">
  <div class="loader-logo">C</div>
  <div class="loader-spinner"></div>
  <div class="loader-text">Loading</div>
</div>

<script>
function hideLoader() {
  var loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
  document.body.classList.add('loaded');
}
if (document.readyState === 'complete') {
  setTimeout(hideLoader, 300);
} else {
  window.addEventListener('load', function() { setTimeout(hideLoader, 300); });
}
setTimeout(hideLoader, 2000);
</script>

<div class="container">

  <header>
    <div class="logo">
      <div class="logo-mark">C</div>
      <span>Content API</span>
    </div>
    <div class="status">
      <span class="status-dot"></span>
      All systems operational
    </div>
  </header>

  <section class="hero">
    <h1>Bilingual Content Backend API</h1>
    <p>
      Production-grade REST API powering a calm, ad-free bilingual reading platform.
      Built with NestJS, JWT authentication, and Google Drive storage.
    </p>
    <div class="hero-buttons">
      <a href="/api/contents">→ /api/contents</a>
      <a href="#endpoints">→ API Endpoints</a>
      <a href="#security">→ Security</a>
    </div>
  </section>

  <section id="architecture">
    <h2>Architecture</h2>
    <ul class="list">
      <li>NestJS framework — modular, TypeScript-first</li>
      <li>JWT authentication — stateless, bcrypt hashing</li>
      <li>Google Drive storage — JSON-based, zero DB</li>
      <li>Bilingual content — English + Bengali native</li>
      <li>Rich text — Quill delta storage</li>
      <li>Rate limiting — throttler-based protection</li>
    </ul>
  </section>

  <section id="endpoints">
    <h2>API Endpoints</h2>
    <p>All endpoints prefixed with <code>/api</code>.</p>

    <div class="endpoint-group">
      <div class="endpoint-group-title">Authentication</div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/signup</span><span class="endpoint-desc">Register new user</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/login</span><span class="endpoint-desc">Login</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/google</span><span class="endpoint-desc">Google OAuth</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/auth/me</span><span class="endpoint-desc">Profile</span></div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">Contents</div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/contents</span><span class="endpoint-desc">List contents</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/contents/:slug</span><span class="endpoint-desc">Get by slug</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/contents</span><span class="endpoint-desc">Create</span></div>
      <div class="endpoint"><span class="method put">PUT</span><span class="endpoint-path">/api/contents/:id</span><span class="endpoint-desc">Update</span></div>
      <div class="endpoint"><span class="method delete">DELETE</span><span class="endpoint-path">/api/contents/:id</span><span class="endpoint-desc">Delete</span></div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">Categories</div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/categories</span><span class="endpoint-desc">List</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/categories</span><span class="endpoint-desc">Create</span></div>
      <div class="endpoint"><span class="method put">PUT</span><span class="endpoint-path">/api/categories/:id</span><span class="endpoint-desc">Update</span></div>
      <div class="endpoint"><span class="method delete">DELETE</span><span class="endpoint-path">/api/categories/:id</span><span class="endpoint-desc">Delete</span></div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">Completed & Votes</div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/completed</span><span class="endpoint-desc">Mark complete</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/completed</span><span class="endpoint-desc">List completed</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/votes</span><span class="endpoint-desc">Vote</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/votes/:contentId</span><span class="endpoint-desc">Tally</span></div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">Utilities</div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/weather</span><span class="endpoint-desc">Weather</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/upload/image</span><span class="endpoint-desc">Upload</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/test-drive</span><span class="endpoint-desc">Test Drive</span></div>
    </div>
  </section>

  <section>
    <h2>Response Format</h2>
    <p>POST /api/auth/signup — 201 Created</p>
    <pre class="code">{
  <span class="k">"accessToken"</span>: <span class="s">"eyJhbGciOiJIUzI1NiIsInR5cCI6..."</span>,
  <span class="k">"user"</span>: {
    <span class="k">"id"</span>: <span class="s">"5371bfea-2b1d-48f0-af6e..."</span>,
    <span class="k">"username"</span>: <span class="s">"prodtester"</span>,
    <span class="k">"email"</span>: <span class="s">"prodtest@example.com"</span>,
    <span class="k">"role"</span>: <span class="s">"user"</span>
  }
}</pre>
  </section>

  <section id="security">
    <h2>Security</h2>
    <ul class="list">
      <li>Bcrypt password hashing (10 rounds)</li>
      <li>JWT stateless tokens (7-day expiry)</li>
      <li>Rate limiting via throttler</li>
      <li>CORS restricted to authorized origins</li>
      <li>Input validation with class-validator</li>
      <li>Role-based access control (admin / user)</li>
    </ul>
  </section>

  <section>
    <h2>Technology Stack</h2>
    <div class="tech-list">
      <span class="tech-tag">NestJS v12</span>
      <span class="tech-tag">TypeScript v6</span>
      <span class="tech-tag">JWT v12</span>
      <span class="tech-tag">Bcrypt v6</span>
      <span class="tech-tag">Google APIs v186</span>
      <span class="tech-tag">class-validator v0.15</span>
      <span class="tech-tag">Throttler v6</span>
      <span class="tech-tag">Node.js v24</span>
    </div>
  </section>

  <section>
    <h2>Get in touch</h2>
    <p>
      This API powers the Content App frontend. Reach out for API keys or integration support.
    </p>
    <div class="hero-buttons">
      <a href="mailto:api@daccainnovation.com">→ api@daccainnovation.com</a>
      <a href="https://content-app-gamma.vercel.app" target="_blank">→ Frontend App</a>
    </div>
  </section>

  <footer>
    <p>Built by <a href="https://daccainnovation.com" target="_blank">Dacca Innovation</a></p>
    <p>Content API v1.0.0 · Response at ${now}</p>
  </footer>

</div>

</body>
</html>`;
  }

  @Get('test-drive')
  async testDrive() {
    try {
      const fileId = process.env.DRIVE_CONTENTS_FILE_ID;
      this.logger.log(`Testing Drive with fileId: ${fileId}`);

      const contents = await this.driveService.readJson<any[]>(fileId!);

      return {
        success: true,
        message: 'Google Drive connection working!',
        contentsCount: contents.length,
        contents,
      };
    } catch (error) {
      this.logger.error('Drive test failed:', error);

      const err = error as Error & { code?: string };

      throw new InternalServerErrorException({
        message: 'Drive connection failed',
        error: err.message,
        code: err.code,
      });
    }
  }
}