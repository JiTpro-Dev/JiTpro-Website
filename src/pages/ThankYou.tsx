import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * The single post-submission state for the unified contact form
 * (consolidation 2026-08-26). The former scheduleCall router-state fork and
 * its placeholder Microsoft Bookings link are removed with the field that
 * drove them — one form, one confirmation.
 */
export default function ThankYou() {
  return (
    <div className="min-h-screen bg-jp-background text-jp-text-primary">
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-jp-text-primary mb-6">
            Thank you for reaching out.
          </h1>
          <p className="text-xl text-jp-text-secondary leading-relaxed mb-12">
            We&apos;ve received your message and will get back to you directly.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-jp-brand-amber px-8 py-4 text-lg font-semibold text-jp-background transition-colors duration-200 ease-out hover:bg-jp-brand-amber-active focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-jp-text-primary motion-reduce:transition-none"
          >
            Return home
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
