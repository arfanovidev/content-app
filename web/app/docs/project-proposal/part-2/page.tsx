'use client';

import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function ProjectProposalPart2Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:top-16">
        <div className="container mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All documents
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium transition-colors hover:bg-accent print:hidden"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </button>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 print:max-w-none print:px-0 print:py-0">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h1:mb-6 prose-h1:mt-10 prose-h1:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-foreground/90 prose-li:text-foreground/90 prose-table:text-sm prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2 prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left">

          <div className="mb-8 rounded-xl border border-indigo-500/30 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
              Project Proposal â€” Part 2 (Sections 14—29)
            </p>
            <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-300">
              <Link href="/docs/project-proposal" className="underline">
                â† Back to Part 1 (Sections 1—13)
              </Link>
            </p>
          </div>

          {/* 14. Proposed System Architecture */}
          <h2 id="architecture">14. Proposed System Architecture</h2>
          <p>
            The system follows a two-tier client-server architecture with clear
            separation between frontend and backend. The frontend is a Next.js
            application deployed on Vercel, communicating with a NestJS REST API
            backend deployed on Render. The backend accesses Google Drive for
            persistent storage via a service account.
          </p>

          <h3>14.1 High-Level Architecture</h3>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
{`â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Client (Browser)                          â”‚
â”‚  Next.js 16 + Tailwind CSS                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                 â”‚ HTTPS / JWT
                 â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  REST API Backend                          â”‚
â”‚  NestJS 12 + TypeScript                    â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Auth Module (JWT, bcrypt)            â”‚ â”‚
â”‚  â”‚ Contents Module (CRUD)               â”‚ â”‚
â”‚  â”‚ Categories Module (CRUD)             â”‚ â”‚
â”‚  â”‚ Completed Module (progress)          â”‚ â”‚
â”‚  â”‚ Votes Module (upvote/downvote)       â”‚ â”‚
â”‚  â”‚ Weather Module (OpenWeather API)     â”‚ â”‚
â”‚  â”‚ Upload Module (image upload)         â”‚ â”‚
â”‚  â”‚ Drive Module (Google Drive API)      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                 â”‚ Google Drive API
                 â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Storage (Google Drive)                    â”‚
â”‚  contents.json, categories.json,           â”‚
â”‚  users.json, completed.json, votes.json    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜`}
          </pre>

          <h3>14.2 Frontend Layer</h3>
          <ul>
            <li>Server-side rendering and static generation via Next.js App Router.</li>
            <li>Client-side state management using Zustand stores (auth, language, completed).</li>
            <li>Server-state caching using React Query.</li>
            <li>Reusable UI components built on Tailwind CSS and lucide-react icons.</li>
            <li>Responsive layout covering mobile, tablet, and desktop.</li>
          </ul>

          <h3>14.3 Backend Layer</h3>
          <ul>
            <li>Modular NestJS application with dependency injection.</li>
            <li>RESTful API endpoints grouped by domain (auth, contents, categories, etc.).</li>
            <li>JWT authentication with role-based guards.</li>
            <li>Request validation via class-validator DTOs.</li>
            <li>Rate limiting via @nestjs/throttler.</li>
            <li>Google Drive integration via @googleapis/drive and service account credentials.</li>
          </ul>

          <h3>14.4 Storage Layer</h3>
          <p>
            Content, categories, users, completed records, and votes are stored
            as JSON files on Google Drive. The backend reads and writes these
            files through the Drive API using a service account. This approach
            eliminates the need for a dedicated database server, reducing
            operational cost and complexity.
          </p>

          {/* 15. Technology Stack */}
          <h2 id="stack">15. Technology Stack and Justification</h2>
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Justification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frontend framework</td>
                <td>Next.js 16 (App Router)</td>
                <td>Server-side rendering, file-based routing, free Vercel deployment, large ecosystem</td>
              </tr>
              <tr>
                <td>Frontend language</td>
                <td>TypeScript</td>
                <td>Static typing reduces runtime errors and improves maintainability</td>
              </tr>
              <tr>
                <td>Styling</td>
                <td>Tailwind CSS v4</td>
                <td>Utility-first CSS, responsive design, dark mode support</td>
              </tr>
              <tr>
                <td>Icons</td>
                <td>lucide-react</td>
                <td>Consistent icon set, tree-shakeable, TypeScript-first</td>
              </tr>
              <tr>
                <td>Frontend state</td>
                <td>Zustand + React Query</td>
                <td>Lightweight global state and efficient server-state caching</td>
              </tr>
              <tr>
                <td>Backend framework</td>
                <td>NestJS 12</td>
                <td>Modular architecture, dependency injection, TypeScript-first, well-suited for REST APIs</td>
              </tr>
              <tr>
                <td>Backend language</td>
                <td>TypeScript</td>
                <td>Shared language across frontend and backend simplifies development</td>
              </tr>
              <tr>
                <td>Authentication</td>
                <td>JWT + bcrypt</td>
                <td>Stateless authentication with secure password hashing</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>Google Drive API</td>
                <td>Free JSON-based storage, no database administration required</td>
              </tr>
              <tr>
                <td>HTTP client</td>
                <td>axios</td>
                <td>Simple API for REST communication with interceptors for auth tokens</td>
              </tr>
              <tr>
                <td>Validation</td>
                <td>class-validator</td>
                <td>Declarative DTO validation integrated with NestJS</td>
              </tr>
              <tr>
                <td>Deployment</td>
                <td>Vercel + Render</td>
                <td>Free-tier hosting with automatic deployment from GitHub</td>
              </tr>
            </tbody>
          </table>

          {/* 16. Database Overview */}
          <h2 id="database">16. Database Overview</h2>
          <p>
            The system does not use a traditional relational or document
            database. Instead, data is stored in JSON files on Google Drive.
            Five logical entities are persisted:
          </p>

          <h3>16.1 Entity Overview</h3>
          <table>
            <thead>
              <tr>
                <th>Entity</th>
                <th>Storage File</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Content</td>
                <td>contents.json</td>
                <td>Bilingual articles with title, description, cover image, article body, category, tags, author, read time, and language metadata</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>categories.json</td>
                <td>Categories for organizing content with bilingual name and description, icon, and sort order</td>
              </tr>
              <tr>
                <td>User</td>
                <td>users.json</td>
                <td>Registered users with username, email, password hash, role, and provider (email or Google)</td>
              </tr>
              <tr>
                <td>Completed Record</td>
                <td>completed.json</td>
                <td>Reading-completion records linking users to content items</td>
              </tr>
              <tr>
                <td>Vote</td>
                <td>votes.json</td>
                <td>Upvote or downvote records per content item and per user</td>
              </tr>
            </tbody>
          </table>

          <h3>16.2 Key Relationships</h3>
          <ul>
            <li>One Category has many Content items (1:N).</li>
            <li>One User has many Completed Records (1:N).</li>
            <li>One Content has many Completed Records (1:N).</li>
            <li>One Content has many Vote records (1:N).</li>
            <li>One User has many Vote records (1:N).</li>
          </ul>

          {/* 17. UI/UX Design Plan */}
          <h2 id="ui-ux">17. UI/UX Design Plan</h2>

          <h3>17.1 Design Principles</h3>
          <ul>
            <li><strong>Clarity over decoration:</strong> every screen prioritizes readability and usability.</li>
            <li><strong>Consistency:</strong> shared color palette, typography, spacing, and component library.</li>
            <li><strong>Accessibility:</strong> appropriate contrast ratios, focus indicators, and ARIA labels.</li>
            <li><strong>Responsiveness:</strong> mobile-first layouts with breakpoints at 640 px, 768 px, and 1024 px.</li>
            <li><strong>Distraction-free reading:</strong> minimal chrome and no intrusive overlays on the reading page.</li>
          </ul>

          <h3>17.2 Key Screens</h3>
          <table>
            <thead>
              <tr>
                <th>Screen</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Home</td><td>Hero section, category navigation, and content grid</td></tr>
              <tr><td>Content details</td><td>Bilingual article view with Text-to-Speech controls</td></tr>
              <tr><td>Authentication modal</td><td>Sign up and sign in with email or Google OAuth</td></tr>
              <tr><td>Favorites</td><td>Completed content list for the current user</td></tr>
              <tr><td>Profile</td><td>User details and reading statistics</td></tr>
              <tr><td>Admin dashboard</td><td>Content statistics and quick actions</td></tr>
              <tr><td>Admin content list</td><td>CRUD operations on existing content</td></tr>
              <tr><td>Admin content editor</td><td>Bilingual content creation and editing form</td></tr>
              <tr><td>Admin categories</td><td>Category management interface</td></tr>
            </tbody>
          </table>

          <h3>17.3 Design System</h3>
          <ul>
            <li><strong>Typography:</strong> Inter for English, Noto Sans Bengali for Bengali.</li>
            <li><strong>Colors:</strong> CSS variables for light and dark themes, primary accent color (indigo-violet).</li>
            <li><strong>Spacing:</strong> 4 px base unit, consistent across components.</li>
            <li><strong>Radius:</strong> 8 px default, 12 px for cards, 999 px for pills.</li>
          </ul>

          {/* 18. Security and Privacy */}
          <h2 id="security">18. Security and Privacy Considerations</h2>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Password storage</td><td>bcrypt with cost factor 10 or higher</td></tr>
              <tr><td>Session management</td><td>JWT tokens with 7-day expiration, stored in localStorage</td></tr>
              <tr><td>Authorization</td><td>Role-based guards on all admin endpoints</td></tr>
              <tr><td>Input validation</td><td>class-validator DTOs on all POST/PUT endpoints</td></tr>
              <tr><td>Rate limiting</td><td>@nestjs/throttler on all public endpoints</td></tr>
              <tr><td>CORS</td><td>Restricted to configured frontend origins</td></tr>
              <tr><td>OAuth</td><td>Google OAuth with official library, audience verified</td></tr>
              <tr><td>Transport</td><td>HTTPS enforced on both Vercel and Render</td></tr>
              <tr><td>Data storage</td><td>JSON files accessible only via authenticated service account</td></tr>
              <tr><td>Privacy</td><td>No third-party analytics, no tracking pixels, no advertising</td></tr>
              <tr><td>Content protection</td><td>Right-click, copy, and devtools shortcuts blocked on public pages (deterrent only)</td></tr>
            </tbody>
          </table>

          {/* 19. Development Methodology */}
          <h2 id="methodology">19. Software Development Methodology</h2>
          <p>
            The project follows an iterative and incremental development
            methodology. While a full Agile framework is unnecessary for a
            single-developer project, the spirit of iterative development is
            maintained through weekly milestones and continuous refactoring.
          </p>
          <ul>
            <li><strong>Phase 1 â€” Requirements:</strong> gather and document functional and non-functional requirements.</li>
            <li><strong>Phase 2 â€” Design:</strong> design the architecture, database model, and UI/UX.</li>
            <li><strong>Phase 3 â€” Backend implementation:</strong> develop the REST API with authentication.</li>
            <li><strong>Phase 4 â€” Frontend implementation:</strong> develop the user interfaces and integrate with the backend.</li>
            <li><strong>Phase 5 â€” Testing:</strong> unit, integration, and end-to-end testing.</li>
            <li><strong>Phase 6 â€” Deployment:</strong> deploy frontend and backend to production platforms.</li>
            <li><strong>Phase 7 â€” Documentation:</strong> produce all required project artifacts.</li>
          </ul>

          {/* 20. Testing Strategy */}
          <h2 id="testing">20. Testing and Quality Assurance Strategy</h2>

          <h3>20.1 Testing Levels</h3>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Unit testing</td><td>Test individual service methods and utility functions</td></tr>
              <tr><td>Integration testing</td><td>Test API endpoints with a real HTTP client</td></tr>
              <tr><td>End-to-end testing</td><td>Test full user flows using browser automation</td></tr>
              <tr><td>Manual testing</td><td>Exploratory testing on all user-facing screens</td></tr>
              <tr><td>Responsive testing</td><td>Verify layouts on mobile, tablet, and desktop breakpoints</td></tr>
              <tr><td>Security testing</td><td>Verify authentication and authorization guards</td></tr>
              <tr><td>Performance testing</td><td>Verify response times and page loads against NFR targets</td></tr>
            </tbody>
          </table>

          <h3>20.2 Test Coverage Targets</h3>
          <ul>
            <li>Backend service methods: minimum 70% line coverage.</li>
            <li>API endpoints: all endpoints tested for success and error cases.</li>
            <li>Frontend critical paths: signup, login, content reading, admin CRUD.</li>
            <li>All functional requirements (FR-001 to FR-015) covered by at least one test.</li>
          </ul>

          <h3>20.3 Quality Assurance Practices</h3>
          <ul>
            <li>TypeScript strict mode enabled on both frontend and backend.</li>
            <li>ESLint and Prettier for code style consistency.</li>
            <li>Manual code review before each push.</li>
            <li>Automated CI pipeline running tests on every push (planned).</li>
          </ul>

          {/* 21. Deployment and Maintenance */}
          <h2 id="deployment">21. Deployment and Maintenance Plan</h2>

          <h3>21.1 Deployment Strategy</h3>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Platform</th>
                <th>Trigger</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Frontend</td><td>Vercel (free tier)</td><td>Push to main branch</td></tr>
              <tr><td>Backend</td><td>Render (free tier)</td><td>Push to main branch</td></tr>
              <tr><td>Storage</td><td>Google Drive</td><td>API calls from backend</td></tr>
            </tbody>
          </table>

          <h3>21.2 Maintenance Plan</h3>
          <ul>
            <li>Weekly review of error logs from Render and Vercel.</li>
            <li>Monthly update of npm dependencies.</li>
            <li>Quarterly review of security configuration.</li>
            <li>Backup of Google Drive JSON files to a local repository.</li>
            <li>Uptime monitoring via UptimeRobot (5-minute intervals).</li>
          </ul>

          <h3>21.3 Backup and Recovery</h3>
          <ul>
            <li>Google Drive JSON files are backed up to a local folder on a weekly basis.</li>
            <li>Source code is versioned in Git and mirrored to GitHub.</li>
            <li>Environment variables are documented in .env.example.</li>
            <li>Recovery procedure documented in the Backup & Recovery Guide (Section 33 of documentation).</li>
          </ul>

          {/* 22. Timeline */}
          <h2 id="timeline">22. Project Timeline</h2>
          <p>
            The project is scheduled across eight weeks. The timeline below
            provides measurable deliverables at the end of each phase.
          </p>
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Phase</th>
                <th>Deliverables</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Requirements analysis</td><td>Project proposal, requirements document (SRS)</td></tr>
              <tr><td>2</td><td>System and UI/UX design</td><td>Architecture diagram, UML diagrams, wireframes</td></tr>
              <tr><td>3</td><td>Backend development (Part 1)</td><td>NestJS setup, authentication module, contents CRUD</td></tr>
              <tr><td>4</td><td>Backend development (Part 2)</td><td>Categories, votes, completed, upload modules</td></tr>
              <tr><td>5</td><td>Frontend development (Part 1)</td><td>Authentication, home page, content list</td></tr>
              <tr><td>6</td><td>Frontend development (Part 2)</td><td>Content details, admin panel, favorites</td></tr>
              <tr><td>7</td><td>Testing and quality assurance</td><td>Test report, bug fixes, coverage report</td></tr>
              <tr><td>8</td><td>Deployment and documentation</td><td>Deployed application, user manual, final report</td></tr>
            </tbody>
          </table>

          {/* 23. Expected Outcomes */}
          <h2 id="outcomes">23. Expected Outcomes</h2>
          <ul>
            <li>A deployed full-stack web application accessible to the public.</li>
            <li>A complete bilingual reading platform with Text-to-Speech support in both languages.</li>
            <li>Secure authentication with email/password and Google OAuth.</li>
            <li>A complete administrative interface for content management.</li>
            <li>Complete software engineering documentation covering all phases of the lifecycle.</li>
            <li>Test artifacts including test plan, test cases, and coverage reports.</li>
            <li>A reproducible deployment using free-tier cloud infrastructure.</li>
          </ul>

          {/* 24. Risks and Mitigation */}
          <h2 id="risks">24. Project Risks and Mitigation Strategies</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Risk</th>
                <th>Impact</th>
                <th>Mitigation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R-001</td>
                <td>Free-tier backend sleeps after inactivity, causing 30—50 second delays.</td>
                <td>Medium</td>
                <td>Configure UptimeRobot to ping the API every 5 minutes.</td>
              </tr>
              <tr>
                <td>R-002</td>
                <td>Google Drive API quota exceeded due to excessive content.</td>
                <td>Medium</td>
                <td>Monitor storage usage; plan migration to a dedicated database in a future version.</td>
              </tr>
              <tr>
                <td>R-003</td>
                <td>Google OAuth credentials compromised.</td>
                <td>High</td>
                <td>Rotate all secrets periodically; follow documented rotation procedure.</td>
              </tr>
              <tr>
                <td>R-004</td>
                <td>Vercel or Render free-tier policy changes.</td>
                <td>Low</td>
                <td>Maintain Docker configuration for migration to any hosting platform.</td>
              </tr>
              <tr>
                <td>R-005</td>
                <td>Loss of Google Drive data.</td>
                <td>High</td>
                <td>Weekly backup of JSON files to local storage.</td>
              </tr>
              <tr>
                <td>R-006</td>
                <td>Unexpected scope creep delaying timeline.</td>
                <td>Medium</td>
                <td>Follow documented out-of-scope list; defer new features to future versions.</td>
              </tr>
            </tbody>
          </table>

          {/* 25. Project Limitations */}
          <h2 id="limitations">25. Project Limitations</h2>
          <ul>
            <li>The application is a web application only; no native mobile or desktop clients exist in this version.</li>
            <li>Content is stored as JSON files; this approach will not scale to thousands of concurrent users.</li>
            <li>There is no email verification or password reset flow.</li>
            <li>There is no comment or discussion system.</li>
            <li>Search functionality is limited to category filtering.</li>
            <li>Free-tier backend sleep may cause first-request delays of up to 50 seconds.</li>
            <li>Content protection mechanisms are deterrent only and can be bypassed by determined users.</li>
          </ul>

          {/* 26. Future Enhancements */}
          <h2 id="future">26. Future Enhancements</h2>
          <ul>
            <li>Migration from Google Drive JSON storage to a managed database (PostgreSQL or MongoDB).</li>
            <li>Native mobile applications for iOS and Android.</li>
            <li>Email verification and password reset flows.</li>
            <li>User comments and discussion threads.</li>
            <li>Full-text search with indexing.</li>
            <li>Subscription and payment integration for supporting the platform.</li>
            <li>Advanced Text-to-Speech controls (speed, voice selection, chapter markers).</li>
            <li>Offline reading support via Progressive Web App (PWA).</li>
            <li>Multi-language support beyond English and Bengali.</li>
            <li>Analytics dashboard for content administrators.</li>
          </ul>

          {/* 27. Conclusion */}
          <h2 id="conclusion">27. Conclusion</h2>
          <p>
            Content App addresses a real gap in the market for a distraction-free,
            bilingual reading platform with integrated Text-to-Speech. The
            proposed solution leverages modern web technologies, cloud services,
            and free-tier infrastructure to deliver a production-quality
            application without operational cost. The project demonstrates the
            full software engineering lifecycle, from requirements analysis and
            system design through implementation, testing, and deployment. Upon
            completion, the platform will serve as both a functional application
            for real users and a portfolio-grade demonstration of software
            engineering skills.
          </p>

          {/* 28. References */}
          <h2 id="references">28. References</h2>
          <ol className="text-sm">
            <li>Next.js Documentation. https://nextjs.org/docs</li>
            <li>NestJS Documentation. https://docs.nestjs.com</li>
            <li>TypeScript Documentation. https://www.typescriptlang.org/docs</li>
            <li>Tailwind CSS Documentation. https://tailwindcss.com/docs</li>
            <li>Google Drive API Documentation. https://developers.google.com/drive</li>
            <li>JSON Web Tokens (JWT). https://jwt.io/introduction</li>
            <li>Open Web Application Security Project (OWASP). https://owasp.org</li>
            <li>Vercel Platform Documentation. https://vercel.com/docs</li>
            <li>Render Platform Documentation. https://render.com/docs</li>
            <li>MDN Web Speech API. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API</li>
          </ol>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            â€” End of Part 2 (Sections 14—29) â€”
          </p>

          <p className="text-center">
            <Link
              href="/docs/project-proposal"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
            >
              â† Back to Part 1
            </Link>
          </p>

        </div>
      </article>
    </div>
  );
}