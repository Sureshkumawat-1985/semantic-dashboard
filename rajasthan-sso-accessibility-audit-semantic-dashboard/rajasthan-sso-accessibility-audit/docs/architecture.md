# Architecture

## Boundaries

- `client/`: React presentation, navigation, accessible UI and API calls. It must never own secrets or database credentials.
- `server/`: HTTP API, validation, authorization and future domain services. Business rules live here, not in React components.
- `docs/`: audit evidence, decisions, setup and remediation records.
- `tests/`: browser-level acceptance tests and future accessibility/integration suites.

The initial slice is intentionally small: the browser calls `GET /api/health`; the server returns a service status. It proves local client/server wiring without collecting SSO IDs, passwords, CAPTCHA values, OTPs or personal data.

## First production vertical slice

1. Define a public service-directory read model and API contract.
2. Add server-side schema validation and safe error handling.
3. Render a searchable directory with semantic headings, labelled search and keyboard-operable filters.
4. Add API integration tests and Playwright keyboard/accessibility checks.
5. Review privacy, retention, rate limiting and authorization before any account-related feature.

## Security boundary

This is an independent learning project, not a replacement SSO implementation. Never copy the government login form in a way that could collect credentials. Do not store real SSO credentials, OTPs, Jan Aadhaar data or CAPTCHA answers. Keep secrets in environment variables and out of Git.


## Semantic dashboard UI

The client shell is organized as `header` (global identity/navigation), `aside` (workspace navigation and contextual note), `main` (the active view), and `footer` (secondary navigation/disclaimer). Each view has a page-level heading. Dashboard metrics and recent activity use labelled sections and articles; the requests view uses a captioned table with `scope="col"` and `scope="row"`. Settings and request entry use native labelled controls and fieldsets. The request form opens in a native `dialog`, which supplies browser-managed modal focus behavior; Escape and the explicit close/cancel controls dismiss it.

The four client views are addressable through URL fragments (`#dashboard`, `#services`, `#reports`, `#settings`). This is a lightweight prototype navigation strategy, not server-side routing. For a production multi-page application, introduce a router with route-level loading/error boundaries and preserve the same semantic shell.
