import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

type Page = 'dashboard' | 'services' | 'reports' | 'settings';
const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard', services: 'Service requests', reports: 'Reports', settings: 'Settings',
};
const requests = [
  { id: 'RJ-1042', service: 'Residence certificate', applicant: 'Aarav Sharma', date: '27 Nov 2026', status: 'Under review' },
  { id: 'RJ-1041', service: 'Income certificate', applicant: 'Meera Singh', date: '26 Nov 2026', status: 'Approved' },
  { id: 'RJ-1040', service: 'Caste certificate', applicant: 'Kabir Khan', date: '25 Nov 2026', status: 'Action required' },
];

function readPage(): Page {
  const value = window.location.hash.replace('#', '') as Page;
  return value in pageTitles ? value : 'dashboard';
}

export default function App() {
  const [page, setPage] = useState<Page>(readPage);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onHashChange = () => setPage(readPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modalOpen && !dialog.open) dialog.showModal();
    if (!modalOpen && dialog.open) dialog.close();
  }, [modalOpen]);

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setModalOpen(false);
    setNotice('Your demonstration request has been saved locally. No personal data was sent.');
    form.reset();
    addButtonRef.current?.focus();
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="topbar">
        <a className="brand" href="#dashboard" aria-label="Public Service Access dashboard home">
          <span className="brand-mark" aria-hidden="true">RJ</span>
          <span><strong>Public Service Access</strong><small>Accessibility prototype</small></span>
        </a>
        <nav className="top-navigation" aria-label="Global navigation">
          <a href="https://sso.rajasthan.gov.in/signin" target="_blank" rel="noreferrer">Official Rajasthan SSO <span aria-hidden="true">↗</span></a>
          <span className="prototype-label">Independent demo · Not an official service</span>
        </nav>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Dashboard sidebar">
          <p className="nav-heading">WORKSPACE</p>
          <nav aria-label="Primary navigation">
            <ul className="side-nav">
              {(Object.keys(pageTitles) as Page[]).map((key) => (
                <li key={key}>
                  <a href={`#${key}`} aria-current={page === key ? 'page' : undefined}>
                    <span className="nav-symbol" aria-hidden="true">{({ dashboard: '▦', services: '▤', reports: '▥', settings: '⚙' })[key]}</span>
                    {pageTitles[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <section className="sidebar-note" aria-labelledby="privacy-title">
            <h2 id="privacy-title">Demo environment</h2>
            <p>Use fictional information only. This prototype does not connect to government records.</p>
          </section>
        </aside>

        <main id="main-content" className="main-content" tabIndex={-1}>
          <div className="page-heading">
            <div><p className="eyebrow">PUBLIC SERVICE ADMINISTRATION</p><h1>{pageTitles[page]}</h1></div>
            {page === 'services' && <button ref={addButtonRef} className="button primary" onClick={() => setModalOpen(true)}>＋ New request</button>}
          </div>

          {notice && <p className="notice" role="status">{notice}</p>}

          {page === 'dashboard' && <Dashboard onCreate={() => setModalOpen(true)} />}
          {page === 'services' && <Services />}
          {page === 'reports' && <Reports />}
          {page === 'settings' && <Settings />}
        </main>
      </div>

      <footer className="site-footer">
        <p>Independent educational prototype · No government affiliation · No credentials or real citizen records are collected.</p>
        <nav aria-label="Footer navigation"><a href="#settings">Accessibility settings</a><a href="/docs/audit-report.md">Audit documentation</a></nav>
      </footer>

      <dialog ref={dialogRef} className="request-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onClose={() => setModalOpen(false)}>
        <div className="dialog-header"><div><p className="eyebrow">DEMONSTRATION FORM</p><h2 id="dialog-title">Create service request</h2></div>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={() => setModalOpen(false)}>×</button>
        </div>
        <p id="dialog-description">Enter fictional details to try the accessible form. Fields marked required must be completed.</p>
        <form onSubmit={handleCreate}>
          <fieldset>
            <legend>Applicant information</legend>
            <div className="form-field"><label htmlFor="applicant-name">Applicant name <span aria-hidden="true">*</span></label><input id="applicant-name" name="applicantName" type="text" autoComplete="name" minLength={2} maxLength={80} required /></div>
            <div className="form-field"><label htmlFor="applicant-email">Email address <span aria-hidden="true">*</span></label><input id="applicant-email" name="email" type="email" autoComplete="email" required aria-describedby="email-hint" /><small id="email-hint">Use a fictional email address for this demonstration.</small></div>
          </fieldset>
          <fieldset>
            <legend>Request details</legend>
            <div className="form-field"><label htmlFor="service-type">Service type <span aria-hidden="true">*</span></label><select id="service-type" name="serviceType" required defaultValue=""><option value="" disabled>Select a service</option><option>Residence certificate</option><option>Income certificate</option><option>Caste certificate</option></select></div>
            <div className="form-field"><label htmlFor="request-note">Additional information</label><textarea id="request-note" name="note" rows={3} maxLength={500} aria-describedby="note-hint" /><small id="note-hint">Optional. Maximum 500 characters.</small></div>
          </fieldset>
          <div className="dialog-actions"><button className="button secondary" type="button" onClick={() => setModalOpen(false)}>Cancel</button><button className="button primary" type="submit">Save demonstration</button></div>
        </form>
      </dialog>
    </div>
  );
}

function Dashboard({ onCreate }: { onCreate: () => void }) {
  return <>
    <ApiHealth />
    <section className="metrics" aria-label="Service overview">
      <article className="metric-card"><h2>Total requests</h2><p className="metric-value">1,284</p><p className="metric-caption">Illustrative sample data</p></article>
      <article className="metric-card"><h2>Under review</h2><p className="metric-value">216</p><p className="metric-caption">Illustrative sample data</p></article>
      <article className="metric-card"><h2>Approved</h2><p className="metric-value">932</p><p className="metric-caption">Illustrative sample data</p></article>
    </section>
    <section className="content-card" aria-labelledby="recent-title">
      <div className="card-heading"><div><p className="eyebrow">LATEST ACTIVITY</p><h2 id="recent-title">Recent service requests</h2></div><a href="#services">View all requests</a></div>
      <RequestTable />
    </section>
    <aside className="help-card" aria-labelledby="help-title"><div><h2 id="help-title">Need to add a request?</h2><p>Open the demonstration form. Do not enter real citizen information.</p></div><button className="button secondary" onClick={onCreate}>Create sample request</button></aside>
  </>;
}

function ApiHealth() {
  const [status, setStatus] = useState('Not checked yet');
  async function checkHealth() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'}/api/health`);
      if (!response.ok) throw new Error('API unavailable');
      const data = await response.json();
      setStatus(`API ${data.status} — ${data.service}`);
    } catch { setStatus('API unavailable. Start the server and try again.'); }
  }
  return <section className="api-health" aria-labelledby="api-health-title"><div><h2 id="api-health-title">API connection</h2><p role="status" aria-live="polite">{status}</p></div><button className="button secondary" onClick={checkHealth}>Check API status</button></section>;
}

function Services() {
  return <section className="content-card" aria-labelledby="requests-title"><div className="card-heading"><div><p className="eyebrow">REQUEST MANAGEMENT</p><h2 id="requests-title">All service requests</h2></div></div><RequestTable /></section>;
}

function RequestTable() {
  return <div className="table-scroll"><table><caption>Sample service requests. All names and records are fictional.</caption><thead><tr><th scope="col">Request ID</th><th scope="col">Service</th><th scope="col">Applicant</th><th scope="col">Submitted</th><th scope="col">Status</th></tr></thead><tbody>{requests.map((request) => <tr key={request.id}><th scope="row">{request.id}</th><td>{request.service}</td><td>{request.applicant}</td><td>{request.date}</td><td><span className={`status status-${request.status.toLowerCase().replaceAll(' ', '-')}`}>{request.status}</span></td></tr>)}</tbody></table></div>;
}

function Reports() {
  return <section className="content-card" aria-labelledby="reports-title"><p className="eyebrow">REPORTING</p><h2 id="reports-title">Service performance</h2><p className="muted">Illustrative figures for layout testing only.</p><div className="report-grid"><article><h3>Requests received</h3><p className="metric-value">1,284</p><p>Across the sample reporting period</p></article><article><h3>Average processing time</h3><p className="metric-value">4.2 days</p><p>Illustrative sample metric</p></article></div></section>;
}

function Settings() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('English');
  return <section className="content-card settings-card" aria-labelledby="settings-title"><p className="eyebrow">PREFERENCES</p><h2 id="settings-title">Display and notification settings</h2><form onSubmit={(event) => { event.preventDefault(); }}><fieldset><legend>Language preference</legend><div className="form-field"><label htmlFor="language">Interface language</label><select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}><option>English</option><option>हिन्दी</option></select></div></fieldset><fieldset><legend>Notifications</legend><div className="checkbox-field"><input id="email-updates" type="checkbox" checked={emailUpdates} onChange={(event) => setEmailUpdates(event.target.checked)} /><label htmlFor="email-updates">Receive email updates about sample requests</label></div></fieldset><button className="button primary" type="submit">Save preferences</button></form></section>;
}
