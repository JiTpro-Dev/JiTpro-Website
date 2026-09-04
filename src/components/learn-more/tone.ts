/**
 * The surface tone table for the long-form explainer page (Design System
 * Section 50.7).
 *
 * EVERY COLOUR ON THE PAGE RESOLVES THROUGH THIS TABLE, keyed by surface. A
 * section names its surface and takes the ink for it; nothing chooses a colour
 * for itself. That is what keeps the light act from acquiring amber it cannot
 * carry (Section 8.8: on --jp-surface-light the amber tokens measure 1.96:1)
 * and keeps every ordinal on the one Section 48.9 convention.
 *
 * It lives in its own module rather than beside the components so that adding
 * a surface is a single reviewable edit, and so the components file exports
 * components only.
 */

export type Surface = 'dark' | 'elevated' | 'light';

type Tone = {
  /** Section background, plus the band's own edges where it has them. */
  section: string;
  /** Ordinal marker (Section 48.9). Amber on dark, ink on light. */
  ordinal: string;
  /** Headings and highest-emphasis text. */
  heading: string;
  /** Running body copy. */
  body: string;
  /** Captions, supporting labels, de-emphasized text. */
  muted: string;
  /** Hairlines, dividers, and list rules. */
  rule: string;
};

export const TONE: Record<Surface, Tone> = {
  dark: {
    section: 'bg-jp-background',
    ordinal: 'text-jp-brand-amber/80',
    heading: 'text-jp-text-primary',
    body: 'text-jp-text-secondary',
    muted: 'text-jp-text-muted',
    rule: 'border-jp-border/12',
  },
  /* The elevated dark band. Its own top and bottom edges mark it as a band
     rather than a change of act (Section 48.6). */
  elevated: {
    section: 'border-y border-jp-border/12 bg-jp-surface',
    ordinal: 'text-jp-brand-amber/80',
    heading: 'text-jp-text-primary',
    body: 'text-jp-text-secondary',
    muted: 'text-jp-text-muted',
    rule: 'border-jp-border/12',
  },
  /* The approved light surface. Hierarchy is ink and amber carries no
     information here (Section 8.8, Section 48.9 light amendment). */
  light: {
    section: 'bg-jp-surface-light',
    ordinal: 'text-jp-ink-secondary/85',
    heading: 'text-jp-background',
    body: 'text-jp-ink-secondary',
    muted: 'text-jp-ink-secondary/85',
    rule: 'border-jp-ink-secondary/20',
  },
};
