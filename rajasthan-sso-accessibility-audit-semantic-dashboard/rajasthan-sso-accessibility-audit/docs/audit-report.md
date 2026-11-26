# Rajasthan SSO accessibility & architecture audit

- Target: https://sso.rajasthan.gov.in/signin
- Research observation date: **27 November 2026**
- Audit status: **Partial — live content inspected; Lighthouse and keyboard testing pending**
- Evaluation target: WCAG 2.2 AA; Lighthouse is an automated signal, not a conformance certificate.

## Method and current limits

The live sign-in page was opened and its extracted page content reviewed. The observation is recorded in [`evidence/rajasthan-sso-page-observation-2026-11-27.md`](evidence/rajasthan-sso-page-observation-2026-11-27.md). It is a text extraction, not a browser screenshot or DOM/Accessibility Tree inspection. A browser shell session could not resolve the portal hostname, so a real Lighthouse run and interactive keyboard-only pass could not be completed here.

**No Lighthouse score is claimed. No keyboard failure is claimed.** The five items below are evidence-backed audit findings/investigation items with explicit confidence labels. Do not represent the provisional items as confirmed WCAG failures until the listed checks are performed.

## Findings register

| ID | Finding / evidence | Confidence | Priority | Remediation / verification |
|---|---|---|---|---|
| ARCH-01 | The live page extraction contains a long “How to enable JavaScript” help section with Internet Explorer instructions and legacy Chrome menu wording (captured in the evidence note). This content is visibly outdated for a modern browser support guide. | Confirmed content-maintenance issue | P2 | Replace with current browser guidance or a concise supported-browser help link; review periodically. Verify the section is still present in the rendered page and does not displace core content. |
| A11Y-01 | The page extraction reports several controls only as generic `[Input]` tokens, while the three credential inputs are represented with names. Extraction alone cannot tell whether the unnamed controls have accessible names. | Unverified accessibility risk | P1 if confirmed | Inspect every input/button/image control in the browser Accessibility Tree; add visible/programmatic labels or accessible names and correct roles where missing. |
| A11Y-02 | The sign-in flow includes a CAPTCHA image and CAPTCHA entry field; the extracted page text does not identify an audio or equivalent accessible challenge alternative. Absence in extraction is not proof that no alternative exists. | Unverified accessibility risk | P0/P1 if no equivalent alternative exists | Check keyboard and screen-reader access and available alternatives. Provide an equivalent accessible verification path; ensure refresh controls are named and state changes announced. |
| A11Y-03 | The page includes a maintenance notice with a Close button and English/Hindi text. Extracted text does not reveal whether it is announced when inserted, whether focus is managed, or whether the close control has an accessible name. | Unverified accessibility risk | P1 if announcement or keyboard operation fails | Inspect role/live-region semantics and keyboard focus. Use an appropriate status/alert pattern, a labelled close button and predictable focus behavior without stealing focus unnecessarily. |
| A11Y-04 | The page exposes English and हिन्दी language options. The extraction cannot establish whether language switching updates the document language, translated accessible names, or focus position. | Unverified accessibility risk | P2; P1 if language is not conveyed | Verify `lang` changes and that all visible text and accessible names update consistently; preserve focus and announce the language change where appropriate. |

## Required test evidence still pending

| Test | Status | Required artifact |
|---|---|---|
| Lighthouse desktop | Not run | HTML/JSON report and screenshot with browser/version/date |
| Lighthouse mobile | Not run | HTML/JSON report and screenshot with viewport metadata |
| Keyboard-only pass | Not run | Tab/Shift+Tab sequence, focus screenshots, traps/operability notes |
| Accessibility Tree / screen reader | Not run | Control name/role/state notes and announcement checks |
| Responsive zoom/reflow and contrast | Not run | 200%/400% screenshots and contrast measurements |

## How to complete the audit on your Windows laptop

1. Install project dependencies with `npm install`.
2. Open Chrome and navigate to `https://sso.rajasthan.gov.in/signin`.
3. In DevTools → Lighthouse, run Accessibility for Desktop, then Mobile. Save reports under `docs/evidence/` and record date, browser version and viewport. Or run `npm run audit:target` from a terminal with internet access and Chrome installed.
4. Reload the page and use only Tab / Shift+Tab / Enter / Space / Escape. Record every focus stop and whether focus is visible; do not enter credentials or submit the form.
5. Inspect names/roles/states in DevTools Accessibility pane. Test with NVDA or Narrator if available.
6. Capture evidence screenshots. Redact any personal data and never include credentials, OTPs, CAPTCHA answers, cookies or authenticated pages.
7. Update confidence and priority only after reproducing each issue.

## Exit criteria

Five findings are reproducible, each has a screenshot/report or exact browser reproduction, user impact, WCAG criterion where applicable, priority, remediation owner and retest result. A Lighthouse score alone does not establish WCAG conformance.
