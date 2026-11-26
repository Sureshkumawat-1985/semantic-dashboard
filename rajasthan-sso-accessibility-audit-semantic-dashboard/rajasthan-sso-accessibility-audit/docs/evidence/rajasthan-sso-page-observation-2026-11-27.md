# Live Rajasthan SSO page observation (retrieved 27 Nov 2026)

Target: https://sso.rajasthan.gov.in/signin  
Source: live-page text extraction opened during the research session. This is not a browser screenshot, Lighthouse report, DOM inspection, or keyboard test.

## Page content captured

- Page title: Rajasthan Single Sign On; displayed version v33.6.
- Language options: English and हिन्दी.
- Login and Registration tabs.
- Digital Identity (SSOID/ Username), Password and Enter Captcha inputs.
- CAPTCHA image and a separate image/link for Meri Pehchaan.
- Forgot Digital Identity and Forgot Password links.
- Maintenance notice: “Maintenance Between 1PM to 2PM” and a Close button; notice text says services are unavailable “today”.
- Footer identifies Department of Information Technology & Communication, Government of Rajasthan and includes Helpdesk Details, Website Policies, Password Policy and Sitemap.
- The extracted page also includes a long “How to enable JavaScript” section with Internet Explorer instructions and legacy Chrome menu wording.

## Evidence limitations

The text extraction represents some controls only as generic `[Input]` tokens and cannot establish whether their accessible names are missing in the actual DOM. It also cannot establish focus order, keyboard operation, contrast, screen-reader announcements, CAPTCHA alternatives, mobile reflow, or whether validation text is visually hidden. Those must be verified in a real browser with keyboard and assistive-technology checks.

No Lighthouse run or keyboard-only pass has been completed in this environment: the browser runtime could not resolve the official portal host from the shell, and no remote browser-control session was available. Do not treat this observation as a conformance audit.

## Reproduction on a workstation

1. Open the target URL in Chrome/Edge with no active authenticated session.
2. Run Lighthouse → Accessibility (desktop and mobile); save HTML/JSON and record browser version, date, viewport and score.
3. Use only Tab, Shift+Tab, Enter, Space and Escape to inspect focus order, visible focus, traps and operability. Do not submit credentials or CAPTCHA.
4. Inspect accessible names and roles in DevTools Accessibility pane; test announcement behavior with a screen reader.
5. Capture screenshots with no personal data or authenticated-session content.
