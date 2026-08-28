import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from './submitContact';
import Turnstile from '../../components/Turnstile';

/**
 * The unified contact form — the site's one contact experience for
 * prospective customers (consolidation approved 2026-08-26). Replaces the
 * Contractor / Owner / Architect contact pages, whose legacy routes redirect
 * here.
 *
 * DELIBERATELY MINIMAL. This is a conversation starter, not a qualification
 * form: first name, last name, email, role, note — nothing else. No project
 * qualification questions, no schedule-call step, no phone/company fields.
 * Adding fields here is a product decision, not a form tweak.
 *
 * PIPELINE (unchanged): submitContactForm() → the submit-contact edge
 * function (Turnstile verified server-side) → the existing `leads` table →
 * database webhook → Resend notification. Legacy qualification columns on
 * `leads` are nullable (verified against the live schema 2026-08-26) and
 * simply stay NULL on new rows. Hidden metadata still sent: intent, source,
 * page. `role` carries the visitor's dropdown selection using the values
 * already in production ('contractor' / 'owner' / 'architect') plus 'other'.
 *
 * PROTECTION (unchanged pattern): honeypot field silently drops bots
 * client-side; Turnstile token is required client-side and verified
 * server-side.
 *
 * STYLING: the established contact-page visual language, expressed in
 * approved --jp-* tokens (§8.8, §45 — new code conforms immediately; the
 * legacy pages' literal classes do not carry over). The inline error state
 * uses neutral tokens because no semantic error color is approved (§8.3);
 * inventing one in a component is prohibited (§49).
 */

const ROLE_OPTIONS = [
  { value: 'contractor', label: 'General Contractor' },
  { value: 'owner', label: 'Project Owner' },
  { value: 'architect', label: 'Architect' },
  { value: 'other', label: 'Other' },
] as const;

export default function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [note, setNote] = useState('');

  // Honeypot
  const [honeypot, setHoneypot] = useState('');

  // Turnstile
  const [turnstileToken, setTurnstileToken] = useState('');
  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(''), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detected
    if (honeypot) return;

    if (!turnstileToken) {
      setError('Please complete the verification challenge.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitContactForm(
        {
          role,
          intent: 'contact',
          source: 'website',
          page: '/contact',
          firstName,
          lastName,
          email,
          message: note,
        },
        turnstileToken
      );
      navigate('/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-jp-border/30 bg-jp-surface px-4 py-3 text-lg text-jp-text-primary placeholder:text-jp-text-muted/70 focus:border-jp-brand-amber focus:outline-hidden focus:ring-2 focus:ring-jp-brand-amber-active/30';
  const labelClass = 'block text-sm font-semibold text-jp-text-secondary mb-2';

  return (
    <div className="min-h-screen bg-jp-background text-jp-text-primary">
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-jp-text-primary mb-6">
            Contact JiTpro
          </h1>
          <p className="text-xl text-jp-text-secondary leading-relaxed mb-12">
            Tell us who you are and leave a note. We&apos;ll get back to you directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input
              type="text"
              name="company_website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                type="email"
                id="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>Role *</label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputClass}
              >
                <option value="">Select your role</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="note" className={labelClass}>Note *</label>
              <textarea
                id="note"
                required
                rows={6}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Cloudflare Turnstile */}
            <Turnstile onToken={handleToken} onExpire={handleExpire} theme="dark" />

            {error && (
              <div role="alert" className="rounded-lg border border-jp-border/30 bg-jp-surface p-4 text-jp-text-primary">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !turnstileToken}
              className="w-full rounded-lg bg-jp-brand-amber px-8 py-4 text-lg font-semibold text-jp-background transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none disabled:cursor-not-allowed disabled:bg-jp-surface disabled:text-jp-text-muted"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
