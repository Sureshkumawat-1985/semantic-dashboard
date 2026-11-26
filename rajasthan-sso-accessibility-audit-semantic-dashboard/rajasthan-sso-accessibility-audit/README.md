# Rajasthan SSO — Accessibility & Architecture Audit

An independent, evidence-first accessibility audit and full-stack project foundation for the public Rajasthan Single Sign-On portal.

**Target:** https://sso.rajasthan.gov.in/signin  
**Important:** This repository is not affiliated with the Government of Rajasthan. It does not authenticate users or collect SSO credentials. Audit findings and screenshots remain pending until manually collected from the live site.

## Requirements

- Node.js 20.19+ (or compatible current LTS)
- npm 10+
- Chrome/Chromium for browser testing and Lighthouse

## Local setup

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd rajasthan-sso-accessibility-audit
npm install
cp .env.example .env
npm run dev
```

Open:
- Client: http://localhost:5173
- API health: http://localhost:4000/api/health

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## Available commands

```bash
npm run dev          # client + server
npm run build        # production build
npm run typecheck    # TypeScript checks
npm test             # unit tests
npx playwright install chromium
npm run test:e2e     # browser acceptance tests
npm run audit:lighthouse  # local prototype only
npm run audit:target     # live Rajasthan SSO (run on your internet-connected laptop)
```

## Repository map

```text
client/              React + TypeScript + Vite user interface
server/              Express + TypeScript API
docs/                audit report, architecture, remediation plan, evidence
tests/e2e/           Playwright browser tests
tests/accessibility/ axe-core accessibility smoke tests
playwright.config.ts browser test configuration
lighthouserc.cjs     local prototype Lighthouse CI configuration
```

## Semantic dashboard foundation

The client now contains four hash-addressable views: Dashboard, Service requests, Reports and Settings. The shared shell uses semantic `header`, labelled `nav`, `aside`, `main` and `footer` landmarks. Content is grouped into labelled `section` and `article` elements. The service list uses a captioned data table with scoped row/column headers. The request dialog uses the native HTML `dialog` element, fieldsets/legends, explicit labels, required/type/length constraints, inline instructions and native validation. A skip link, visible focus treatment, responsive layout and reduced-motion handling are included.

The static semantic markup fixture is `docs/validation/semantic-dashboard.html`. Run the local structural check with `npm run validate:html`. To complete the specifically requested W3C check, submit that fixture at https://validator.w3.org/nu/ and save the validator result. The W3C service could not be reached from the authoring environment, so this repository does **not** claim a verified zero-error W3C result yet. The fixture is a validation representation of the React component structure; also inspect the rendered application after building.

## First vertical feature slice

The UI button calls `GET /api/health` and announces the result through a polite live region. This validates the browser/API boundary and provides a small end-to-end test. It deliberately avoids login, credentials and personal data.

## Audit workflow

A partial live-page content observation is documented at `docs/evidence/rajasthan-sso-page-observation-2026-11-27.md`. Lighthouse and interactive keyboard results are intentionally marked pending; this workspace could not reach the portal host from its browser shell.

1. Read `docs/audit-report.md`.
2. Audit the live portal in a clean, logged-out browser session.
3. Save Lighthouse reports and original screenshots under `docs/evidence/` and `docs/screenshots/`.
4. Perform keyboard-only testing and record exact reproduction steps.
5. Promote an investigation target to a finding only after evidence confirms it.
6. Prioritize and retest using `docs/remediation-plan.md`.

## Security and privacy

Never collect or store SSO IDs, passwords, CAPTCHA answers, OTPs, Jan Aadhaar numbers or other personal information. Do not commit `.env`, browser profiles, cookies, or authenticated screenshots. The prototype is not an official login portal.

## GitHub publication

Create an empty GitHub repository, then:

```bash
git init
git add .
git commit -m "chore: add accessible full-stack audit foundation"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/rajasthan-sso-accessibility-audit.git
git push -u origin main
```

Replace `<YOUR_USERNAME>` with your GitHub username. Add the Lighthouse reports and verified screenshots in a separate evidence commit after the audit.

## License

MIT for the original project code and documentation in this repository. Third-party portal content, branding and screenshots remain the property of their respective owners.
