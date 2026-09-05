import { AlertCircle, Check } from 'lucide-react';

/**
 * The status badge. The second element the approved screen genuinely reuses:
 * once per table row and once in the detail panel, identical in both.
 *
 * A rounded rectangle, NOT a pill - measured 25px tall with a ~5px radius. The
 * three tones stay semantically distinct and are never collapsed onto the
 * brand accent.
 */
export type DemoStatus = 'on-track' | 'at-risk' | 'overdue';

export const STATUS_LABEL: Record<DemoStatus, string> = {
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  overdue: 'Overdue',
};

const TONE = {
  'on-track': {
    bg: 'var(--jpd-ok-bg)',
    bd: 'var(--jpd-ok-border)',
    fg: 'var(--jpd-ok-fg)',
  },
  'at-risk': {
    bg: 'var(--jpd-warn-bg)',
    bd: 'var(--jpd-warn-border)',
    fg: 'var(--jpd-warn-fg)',
  },
  overdue: {
    bg: 'var(--jpd-error-bg)',
    bd: 'var(--jpd-error-border)',
    fg: 'var(--jpd-error-fg)',
  },
} as const;

export default function DemoStatusBadge({ status }: { status: DemoStatus }) {
  const tone = TONE[status];
  const icon =
    status === 'on-track' ? (
      <Check size={11} strokeWidth={3} />
    ) : status === 'overdue' ? (
      <AlertCircle size={11} strokeWidth={2.5} />
    ) : (
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'var(--jpd-warn-dot)',
          display: 'block',
        }}
      />
    );

  return (
    <span
      className="inline-flex items-center"
      style={{
        gap: 4,
        height: 25,
        padding: '0 8px',
        borderRadius: 5,
        background: tone.bg,
        border: `1px solid ${tone.bd}`,
        color: tone.fg,
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      {STATUS_LABEL[status]}
    </span>
  );
}
