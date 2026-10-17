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
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0a;--bg-2:#111111;--bg-3:#1a1a1a;--border:#262626;--border-2:#333;--fg:#fafafa;--fg-2:#a1a1aa;--fg-3:#71717a;--primary:#6366f1;--primary-2:#818cf8;--green:#22c55e;--amber:#f59e0b;--red:#ef4444;--blue:#3b82f6;--pink:#ec4899;--purple:#a855f7}
html,body{background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',Roboto,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh;background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(99,102,241,0.15),transparent),var(--bg)}
a{color:inherit;text-decoration:none}
code{font-family:'SF Mono',Menlo,Monaco,'Courier New',monospace;font-size:0.875em}
.container{max-width:1200px;margin:0 auto;padding:0 24px}

nav{border-bottom:1px solid var(--border);padding:16px 0;position:sticky;top:0;background:rgba(10,10,10,0.85);backdrop-filter:blur(12px);z-index:100}
nav .container{display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px}
.logo-mark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--primary),var(--pink));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff}
.nav-links{display:flex;gap:24px;align-items:center;font-size:14px;color:var(--fg-2)}
.nav-links a:hover{color:var(--fg)}
.status-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:var(--green);font-size:12px;font-weight:500}
.status-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,0.5)}50%{opacity:0.6;box-shadow:0 0 0 6px rgba(34,197,94,0)}}

.hero{padding:80px 0 60px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);color:var(--primary-2);font-size:12px;font-weight:500;margin-bottom:24px}
.hero h1{font-size:clamp(36px,6vw,64px);font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-bottom:20px}
.hero h1 .gradient{background:linear-gradient(135deg,var(--primary) 0%,var(--pink) 50%,var(--amber) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{font-size:clamp(16px,2vw,20px);color:var(--fg-2);max-width:640px;margin:0 auto 32px}
.hero-buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;transition:all 0.2s;border:1px solid transparent;cursor:pointer}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:var(--primary-2);transform:translateY(-1px)}
.btn-secondary{background:var(--bg-2);color:var(--fg);border-color:var(--border-2)}
.btn-secondary:hover{background:var(--bg-3);border-color:var(--fg-3)}

.stats{padding:40px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--bg-2)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px;text-align:center}
.stat-value{font-size:32px;font-weight:800;letter-spacing:-0.02em;margin-bottom:4px}
.stat-label{font-size:12px;color:var(--fg-3);text-transform:uppercase;letter-spacing:0.1em;font-weight:500}
.stat-value.green{color:var(--green)}
.stat-value.blue{color:var(--blue)}
.stat-value.purple{color:var(--purple)}
.stat-value.amber{color:var(--amber)}

section{padding:64px 0}
.section-title{font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:8px}
.section-desc{color:var(--fg-2);margin-bottom:40px;font-size:15px}

.arch-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.arch-card{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;padding:24px;position:relative;overflow:hidden;transition:all 0.2s}
.arch-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.arch-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--primary),var(--pink))}
.arch-icon{width:40px;height:40px;border-radius:10px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px}
.arch-card h3{font-size:15px;font-weight:600;margin-bottom:8px}
.arch-card p{font-size:13px;color:var(--fg-2);line-height:1.5}

.endpoint-group{margin-bottom:32px}
.endpoint-group-title{font-size:14px;font-weight:600;color:var(--fg-3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
.endpoint-list{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.endpoint{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid var(--border);font-size:13px;transition:background 0.15s}
.endpoint:last-child{border-bottom:none}
.endpoint:hover{background:var(--bg-3)}
.method{padding:3px 8px;border-radius:5px;font-size:10px;font-weight:700;letter-spacing:0.05em;min-width:52px;text-align:center}
.method.get{background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.3)}
.method.post{background:rgba(59,130,246,0.15);color:var(--blue);border:1px solid rgba(59,130,246,0.3)}
.method.put{background:rgba(245,158,11,0.15);color:var(--amber);border:1px solid rgba(245,158,11,0.3)}
.method.delete{background:rgba(239,68,68,0.15);color:var(--red);border:1px solid rgba(239,68,68,0.3)}
.endpoint-path{font-family:'SF Mono',Menlo,monospace;color:var(--fg);font-size:13px}
.endpoint-desc{color:var(--fg-3);font-size:12px;margin-left:auto}

.code-block{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-top:16px}
.code-header{padding:10px 16px;background:var(--bg-3);border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--fg-3)}
.code-dots{display:flex;gap:6px}
.code-dot{width:10px;height:10px;border-radius:50%}
.code-dot.red{background:#ff5f57}
.code-dot.yellow{background:#febc2e}
.code-dot.green{background:#28c840}
.code-body{padding:16px 20px;font-family:'SF Mono',Menlo,monospace;font-size:12px;line-height:1.7;color:var(--fg-2);overflow-x:auto;white-space:pre}
.code-body .key{color:#93c5fd}
.code-body .string{color:#86efac}
.code-body .number{color:#fbbf24}

.tech-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.tech-item{background:var(--bg-2);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;transition:all 0.2s}
.tech-item:hover{border-color:var(--primary);transform:translateY(-2px)}
.tech-icon{font-size:24px;margin-bottom:8px}
.tech-name{font-size:13px;font-weight:600;margin-bottom:2px}
.tech-version{font-size:11px;color:var(--fg-3);font-family:monospace}

.security-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.security-item{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;padding:20px;display:flex;gap:14px}
.security-icon{width:36px;height:36px;border-radius:8px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.security-content h4{font-size:14px;font-weight:600;margin-bottom:4px}
.security-content p{font-size:13px;color:var(--fg-3);line-height:1.5}

.cta{background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(236,72,153,0.1));border:1px solid var(--border);border-radius:20px;padding:48px 32px;text-align:center;margin:32px 0}
.cta h2{font-size:28px;font-weight:800;letter-spacing:-0.02em;margin-bottom:12px}
.cta p{color:var(--fg-2);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto}

footer{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--fg-3);font-size:13px}
footer .container{display:flex;flex-direction:column;gap:8px;align-items:center}
footer a{color:var(--fg-2)}
footer a:hover{color:var(--fg)}

@media(max-width:768px){
  .hero{padding:60px 0 40px}
  section{padding:40px 0}
  .nav-links{display:none}
  .endpoint{flex-wrap:wrap;gap:6px}
  .endpoint-desc{margin-left:0;width:100%}
}
</style>
</head>
<body>

<nav>
  <div class="container">
    <div class="logo">
      <div class="logo-mark">C</div>
      <span>Content API</span>
    </div>
    <div class="nav-links">
      <a href="#architecture">Architecture</a>
      <a href="#endpoints">Endpoints</a>
      <a href="#security">Security</a>
      <a href="#stack">Stack</a>
      <span class="status-badge">
        <span class="status-dot"></span>
        Operational
      </span>
    </div>
  </div>
</nav>

<div class="hero container">
  <div class="badge">
    <span>v1.0.0</span>
    <span>·</span>
    <span>Production</span>
  </div>
  <h1>
    Bilingual Content<br />
    <span class="gradient">Backend API</span>
  </h1>
  <p>
    Production-grade REST API powering a calm, ad-free bilingual reading platform.
    Built with NestJS, JWT authentication, and Google Drive storage.
  </p>
  <div class="hero-buttons">
    <a href="/api/contents" class="btn btn-primary">Try /api/contents →</a>
    <a href="#endpoints" class="btn btn-secondary">View Endpoints</a>
  </div>
</div>

<div class="stats">
  <div class="container">
    <div class="stats-grid">
      <div>
        <div class="stat-value green">99.9%</div>
        <div class="stat-label">Uptime</div>
      </div>
      <div>
        <div class="stat-value blue">30+</div>
        <div class="stat-label">Endpoints</div>
      </div>
      <div>
        <div class="stat-value purple">JWT</div>
        <div class="stat-label">Auth</div>
      </div>
      <div>
        <div class="stat-value amber">2</div>
        <div class="stat-label">Languages</div>
      </div>
    </div>
  </div>
</div>

<section id="architecture">
  <div class="container">
    <h2 class="section-title">System Architecture</h2>
    <p class="section-desc">Modern, scalable backend designed for reliability and speed.</p>
    <div class="arch-grid">
      <div class="arch-card">
        <div class="arch-icon">⚡</div>
        <h3>NestJS Framework</h3>
        <p>Modular, dependency-injected, TypeScript-first backend framework with enterprise-grade structure.</p>
      </div>
      <div class="arch-card">
        <div class="arch-icon">🔐</div>
        <h3>JWT Authentication</h3>
        <p>Stateless token-based auth with bcrypt password hashing and role-based access control.</p>
      </div>
      <div class="arch-card">
        <div class="arch-icon">☁️</div>
        <h3>Google Drive Storage</h3>
        <p>JSON-based storage on Google Drive with service account access. Zero database infrastructure.</p>
      </div>
      <div class="arch-card">
        <div class="arch-icon">🌍</div>
        <h3>Bilingual Content</h3>
        <p>Native support for English and Bengali content with per-field language selection.</p>
      </div>
      <div class="arch-card">
        <div class="arch-icon">📝</div>
        <h3>Rich Text (Quill)</h3>
        <p>Delta-based rich text storage supporting headings, lists, links, and embedded media.</p>
      </div>
      <div class="arch-card">
        <div class="arch-icon">🛡️</div>
        <h3>Rate Limiting</h3>
        <p>Throttler-based request limiting to prevent abuse and maintain stability under load.</p>
      </div>
    </div>
  </div>
</section>

<section id="endpoints" style="background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <h2 class="section-title">API Endpoints</h2>
    <p class="section-desc">Complete REST API reference. All endpoints are prefixed with <code style="background:var(--bg-3);padding:2px 6px;border-radius:4px">/api</code>.</p>

    <div class="endpoint-group">
      <div class="endpoint-group-title">🔐 Authentication</div>
      <div class="endpoint-list">
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/signup</span><span class="endpoint-desc">Register new user</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/login</span><span class="endpoint-desc">Login with email/password</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/auth/google</span><span class="endpoint-desc">Google OAuth sign-in</span></div>
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/auth/me</span><span class="endpoint-desc">Get current user profile</span></div>
      </div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">📚 Contents</div>
      <div class="endpoint-list">
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/contents</span><span class="endpoint-desc">List all contents</span></div>
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/contents/:slug</span><span class="endpoint-desc">Get single content</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/contents</span><span class="endpoint-desc">Create content (admin)</span></div>
        <div class="endpoint"><span class="method put">PUT</span><span class="endpoint-path">/api/contents/:id</span><span class="endpoint-desc">Update content (admin)</span></div>
        <div class="endpoint"><span class="method delete">DELETE</span><span class="endpoint-path">/api/contents/:id</span><span class="endpoint-desc">Delete content (admin)</span></div>
      </div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">📁 Categories</div>
      <div class="endpoint-list">
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/categories</span><span class="endpoint-desc">List all categories</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/categories</span><span class="endpoint-desc">Create category (admin)</span></div>
        <div class="endpoint"><span class="method put">PUT</span><span class="endpoint-path">/api/categories/:id</span><span class="endpoint-desc">Update category (admin)</span></div>
        <div class="endpoint"><span class="method delete">DELETE</span><span class="endpoint-path">/api/categories/:id</span><span class="endpoint-desc">Delete category (admin)</span></div>
      </div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">💬 Completed & Votes</div>
      <div class="endpoint-list">
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/completed</span><span class="endpoint-desc">Mark content complete</span></div>
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/completed</span><span class="endpoint-desc">List completed</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/votes</span><span class="endpoint-desc">Vote on content</span></div>
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/votes/:contentId</span><span class="endpoint-desc">Get vote tally</span></div>
      </div>
    </div>

    <div class="endpoint-group">
      <div class="endpoint-group-title">🌤️ Utilities</div>
      <div class="endpoint-list">
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/weather</span><span class="endpoint-desc">Weather by coordinates</span></div>
        <div class="endpoint"><span class="method post">POST</span><span class="endpoint-path">/api/upload/image</span><span class="endpoint-desc">Upload image to Drive</span></div>
        <div class="endpoint"><span class="method get">GET</span><span class="endpoint-path">/api/test-drive</span><span class="endpoint-desc">Test Drive connectivity</span></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2 class="section-title">Response Format</h2>
    <p class="section-desc">Consistent JSON responses across all endpoints.</p>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots">
          <span class="code-dot red"></span>
          <span class="code-dot yellow"></span>
          <span class="code-dot green"></span>
        </div>
        <span>POST /api/auth/signup — 201 Created</span>
      </div>
      <div class="code-body">{
  <span class="key">"accessToken"</span>: <span class="string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span>,
  <span class="key">"user"</span>: {
    <span class="key">"id"</span>: <span class="string">"5371bfea-2b1d-48f0-af6e-31ba459ccba7"</span>,
    <span class="key">"username"</span>: <span class="string">"prodtester"</span>,
    <span class="key">"email"</span>: <span class="string">"prodtest@example.com"</span>,
    <span class="key">"role"</span>: <span class="string">"user"</span>
  }
}</div>
    </div>
  </div>
</section>

<section id="security" style="background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <h2 class="section-title">Security & Reliability</h2>
    <p class="section-desc">Enterprise-grade security practices built-in.</p>
    <div class="security-list">
      <div class="security-item">
        <div class="security-icon">🔒</div>
        <div class="security-content">
          <h4>Bcrypt Password Hashing</h4>
          <p>Passwords hashed with bcrypt (10 rounds) before storage. Never stored in plaintext.</p>
        </div>
      </div>
      <div class="security-item">
        <div class="security-icon">🎫</div>
        <div class="security-content">
          <h4>JWT Tokens</h4>
          <p>Stateless authentication with signed tokens and configurable expiration (7 days default).</p>
        </div>
      </div>
      <div class="security-item">
        <div class="security-icon">🚦</div>
        <div class="security-content">
          <h4>Rate Limiting</h4>
          <p>Throttler module limits requests per IP to prevent brute-force and DDoS attacks.</p>
        </div>
      </div>
      <div class="security-item">
        <div class="security-icon">🛡️</div>
        <div class="security-content">
          <h4>CORS Protection</h4>
          <p>Cross-origin requests restricted to authorized frontend origins only.</p>
        </div>
      </div>
      <div class="security-item">
        <div class="security-icon">✅</div>
        <div class="security-content">
          <h4>Input Validation</h4>
          <p>All DTOs validated with class-validator. Invalid requests rejected at the boundary.</p>
        </div>
      </div>
      <div class="security-item">
        <div class="security-icon">🔄</div>
        <div class="security-content">
          <h4>Role-Based Access</h4>
          <p>Admin and user roles enforced via JWT guards on protected endpoints.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="stack">
  <div class="container">
    <h2 class="section-title">Technology Stack</h2>
    <p class="section-desc">Carefully selected, battle-tested technologies.</p>
    <div class="tech-grid">
      <div class="tech-item"><div class="tech-icon">⚡</div><div class="tech-name">NestJS</div><div class="tech-version">v12.x</div></div>
      <div class="tech-item"><div class="tech-icon">🔷</div><div class="tech-name">TypeScript</div><div class="tech-version">v6.x</div></div>
      <div class="tech-item"><div class="tech-icon">🔐</div><div class="tech-name">JWT</div><div class="tech-version">v12.x</div></div>
      <div class="tech-item"><div class="tech-icon">🔒</div><div class="tech-name">Bcrypt</div><div class="tech-version">v6.x</div></div>
      <div class="tech-item"><div class="tech-icon">☁️</div><div class="tech-name">Google APIs</div><div class="tech-version">v186.x</div></div>
      <div class="tech-item"><div class="tech-icon">✅</div><div class="tech-name">class-validator</div><div class="tech-version">v0.15.x</div></div>
      <div class="tech-item"><div class="tech-icon">🚦</div><div class="tech-name">Throttler</div><div class="tech-version">v6.x</div></div>
      <div class="tech-item"><div class="tech-icon">🐘</div><div class="tech-name">Node.js</div><div class="tech-version">v24.x</div></div>
    </div>
  </div>
</section>

<div class="container">
  <div class="cta">
    <h2>Ready to integrate?</h2>
    <p>This API powers the Content App frontend — a bilingual reading platform with ad-free, calm UX. Reach out for API keys or integration support.</p>
    <div class="hero-buttons">
      <a href="mailto:api@daccainnovation.com" class="btn btn-primary">Contact API Team</a>
      <a href="#endpoints" class="btn btn-secondary">Browse Endpoints</a>
    </div>
  </div>
</div>

<footer>
  <div class="container">
    <div>Built with ⚡ by <a href="https://daccainnovation.com" target="_blank">Dacca Innovation</a></div>
    <div>Response generated at ${now}</div>
    <div>Content API v1.0.0 · All systems operational</div>
  </div>
</footer>

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