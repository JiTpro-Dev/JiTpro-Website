import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Plus, X } from 'lucide-react';
import JiTproShell from '../../components/demo/shell/JiTproShell';
import DemoStatusBadge from '../../components/demo/primitives/DemoStatusBadge';
import DemoAvatar from '../../components/demo/primitives/DemoAvatar';
import DemoGantt, { type Zoom } from './DemoGantt';
import { useInspection } from './PhaseInspector';
import { SCHEDULE_ITEMS } from './scheduleFixture';
import { DATA_DATE, PHASE_FAMILIES, STATUS_LABEL, parse } from './scheduleModel';
import './scheduleTokens.css';
import '../../components/demo/tokens.css';

/**
 * PROCUREMENT SCHEDULE - prototype screen.
 *
 * One canonical component. The embedded preview and the expanded inspection
 * view are the same tree; only the capabilities supplied through
 * InspectionContext differ. There is no separate "large" implementation.
 *
 * Shared chrome comes from the approved production JiTproShell (205px sidebar,
 * 60px top bar), NOT from the raster's 194/56 drift. Schedule-specific
 * composition follows the raster: left data area, period header, dense rows,
 * compact bars, legend beneath, pagination footer.
 */

const CANVAS_MAIN_W = 989;
const PAD_L = 18;
const PAD_R = 26;
const CONTENT_W = CANVAS_MAIN_W - PAD_L - PAD_R; // 945
const LEFT_W = 226;
const TIMELINE_W = CONTENT_W - LEFT_W; // 719
const ROW_H = 63;
const HEADER_H = 30;

const ZOOMS: Zoom[] = ['quarters', 'months', 'weeks', 'days'];
const ZOOM_LABEL: Record<Zoom, string> = {
  quarters: 'Quarters',
  months: 'Months',
  weeks: 'Weeks',
  days: 'Days',
};

const fmt = (d: string) =>
  parse(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function ProcurementScheduleScreen() {
  const { enabled } = useInspection();
  const [zoom, setZoom] = useState<Zoom>('quarters');
  const [selectedItemId, setSelectedItemId] = useState(SCHEDULE_ITEMS[4].id); // Heritage Steel

  const item = useMemo(
    () => SCHEDULE_ITEMS.find((i) => i.id === selectedItemId) ?? SCHEDULE_ITEMS[0],
    [selectedItemId],
  );
  const current = item.steps.find((s) => s.id === item.currentStepId);

  /** Families actually present, so the legend cannot list what is not drawn. */
  const usedFamilies = useMemo(() => {
    const used = new Set<string>();
    for (const it of SCHEDULE_ITEMS) for (const s of it.steps) used.add(s.family);
    return PHASE_FAMILIES.filter((f) => used.has(f.key));
  }, []);

  return (
    <JiTproShell
      activeNav="Schedule"
      panel={
        <aside
          className="shrink-0"
          style={{
            width: 254,
            background: 'var(--jpd-surface-sunken)',
            borderLeft: '1px solid var(--jpd-border-subtle)',
            paddingLeft: 20,
            paddingRight: 16,
            paddingTop: 24,
            overflow: 'hidden',
          }}
        >
          <div className="flex items-start">
            <span style={{ fontSize: 15, fontWeight: 600 }}>Schedule Item Detail</span>
            <X size={17} strokeWidth={2} className="ml-auto" />
          </div>

          <div style={{ fontSize: 17, fontWeight: 700, lineHeight: '21px', marginTop: 18 }}>
            {item.name}
          </div>

          <div style={{ marginTop: 13 }}>
            <DemoStatusBadge
              status={
                current
                  ? current.status === 'at-risk'
                    ? 'at-risk'
                    : 'on-track'
                  : item.requiredOnSiteDate < DATA_DATE
                    ? 'on-track'
                    : 'on-track'
              }
            />
          </div>

          <Rule />

          {/* Required On-Site is the panel's headline fact, not a buried row. */}
          <div
            style={{
              marginTop: 14,
              padding: '10px 11px',
              borderRadius: 6,
              background: 'var(--jpd-row-tint)',
              border: '1px solid #f6dfae',
            }}
          >
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#8a6d3b',
              }}
            >
              REQUIRED ON-SITE
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
              {fmt(item.requiredOnSiteDate)}
            </div>
          </div>

          <Field label="Category" value={item.category} />
          <Field label="Procurement Start" value={fmt(item.startDate)} />
          <Field
            label="Overall Duration"
            value={`${item.durationWorkdays} working days`}
          />
          <Field label="Phases & Milestones" value={`${item.steps.length} steps`} />

          <Rule />

          <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 14 }}>Current Phase</div>
          {current ? (
            <>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{current.name}</div>
              <div style={{ fontSize: 12, color: 'var(--jpd-text-muted)', marginTop: 2 }}>
                {fmt(current.startDate)}
                {current.kind === 'phase' ? ` → ${fmt(current.endDate)}` : ''}
              </div>

              <FieldLabel>Responsible Organization</FieldLabel>
              <div style={{ fontSize: 13.5, marginTop: 4 }}>{current.responsibleOrganization}</div>

              <FieldLabel>Commitment Owner</FieldLabel>
              <div className="flex items-center" style={{ gap: 9, marginTop: 6 }}>
                <DemoAvatar initials={current.commitmentOwnerId.slice(0, 2)} size={30} />
                <span>
                  <span style={{ display: 'block', fontSize: 13 }}>
                    {current.commitmentOwnerName}
                  </span>
                  <span
                    style={{ display: 'block', fontSize: 11, color: 'var(--jpd-text-muted)' }}
                  >
                    {current.commitmentOwnerRole}
                  </span>
                </span>
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--jpd-text-muted)', marginTop: 6 }}>
              {item.requiredOnSiteDate < DATA_DATE
                ? 'All phases complete as of the schedule data date.'
                : 'Not yet started as of the schedule data date.'}
            </div>
          )}

          <Rule />
          <div style={{ fontSize: 11.5, color: 'var(--jpd-text-muted)', marginTop: 12 }}>
            Schedule data date {fmt(DATA_DATE)}
          </div>
        </aside>
      }
    >
      <main
        className="shrink-0"
        style={{
          width: CANVAS_MAIN_W,
          paddingLeft: PAD_L,
          paddingRight: PAD_R,
          background: 'var(--jpd-surface)',
        }}
      >
        {/* -------------------------------------------------- PAGE HEADER */}
        <div className="flex items-start" style={{ paddingTop: 22, paddingLeft: 10 }}>
          <div>
            <h1
              className="jpd-tight"
              style={{ fontSize: 25, fontWeight: 800, lineHeight: '27px', color: 'var(--jpd-text)' }}
            >
              Procurement Schedule
            </h1>
            <div
              style={{ fontSize: 12.5, marginTop: 8, color: 'var(--jpd-text-secondary)' }}
            >
              {SCHEDULE_ITEMS.length} procurement items · backward-planned from each Required
              On-Site date
            </div>
          </div>

          <div className="ml-auto flex items-start" style={{ gap: 22 }}>
            <div
              className="flex items-stretch overflow-hidden"
              style={{ height: 34, borderRadius: 6, border: '1px solid var(--jpd-border)' }}
            >
              <span
                className="flex items-center"
                style={{ gap: 7, padding: '0 12px', fontSize: 12.5, fontWeight: 600 }}
              >
                <Download size={14} strokeWidth={2} />
                Export
              </span>
              <span
                className="flex items-center justify-center"
                style={{ width: 30, borderLeft: '1px solid var(--jpd-border)' }}
              >
                <ChevronDown size={14} strokeWidth={2} />
              </span>
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                width: 128,
                height: 34,
                borderRadius: 6,
                background: 'var(--jpd-action)',
                color: '#fff',
                fontSize: 12.5,
                fontWeight: 600,
                gap: 7,
              }}
            >
              <Plus size={15} strokeWidth={2.5} />
              Add Item
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ TOOLBAR */}
        <div className="flex items-center" style={{ marginTop: 16, paddingLeft: 2 }}>
          <div
            className="flex items-center"
            style={{
              height: 32,
              border: '1px solid var(--jpd-border)',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {ZOOMS.map((z) => {
              const on = z === zoom;
              return (
                <button
                  key={z}
                  type="button"
                  onClick={() => enabled && setZoom(z)}
                  tabIndex={enabled ? 0 : -1}
                  style={{
                    height: '100%',
                    padding: '0 15px',
                    fontSize: 12,
                    fontWeight: on ? 600 : 500,
                    border: 0,
                    cursor: enabled ? 'pointer' : 'default',
                    background: on ? 'var(--jpd-nav-bg-start)' : 'transparent',
                    color: on ? '#fff' : 'var(--jpd-text-body)',
                  }}
                >
                  {ZOOM_LABEL[z]}
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center" style={{ gap: 9 }}>
            <Btn>Today</Btn>
            <Btn square>
              <ChevronLeft size={14} strokeWidth={2} />
            </Btn>
            <Btn square>
              <ChevronRight size={14} strokeWidth={2} />
            </Btn>
            <span style={{ width: 12 }} />
            <Btn>
              <Filter size={13} strokeWidth={2} />
              <span style={{ marginLeft: 6 }}>Filters</span>
            </Btn>
          </div>
        </div>

        {/* -------------------------------------------------------- GANTT */}
        <div
          style={{
            marginTop: 14,
            border: '1px solid var(--jpd-border)',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <DemoGantt
            items={SCHEDULE_ITEMS}
            zoom={zoom}
            viewportWidth={TIMELINE_W}
            leftWidth={LEFT_W}
            rowHeight={ROW_H}
            headerHeight={HEADER_H}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
          />
        </div>

        {/* ------------------------------------------------------- LEGEND
            Generated from the same family definitions the bars read, so it
            cannot drift the way the reference raster's legend did. */}
        <div
          className="flex items-center"
          style={{ marginTop: 12, paddingLeft: 2, gap: 15, flexWrap: 'wrap' }}
        >
          {usedFamilies.map((f) => (
            <span key={f.key} className="flex items-center" style={{ gap: 6 }}>
              {f.key === 'required' ? (
                <span
                  style={{
                    width: 9,
                    height: 9,
                    transform: 'rotate(45deg)',
                    background: `var(--jpd-phase-${f.key})`,
                    borderRadius: 1,
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    background: `var(--jpd-phase-${f.key})`,
                  }}
                />
              )}
              <span style={{ fontSize: 10.5, color: 'var(--jpd-text-body)' }}>{f.label}</span>
            </span>
          ))}
          <span className="flex items-center" style={{ gap: 6, marginLeft: 4 }}>
            <span
              style={{
                width: 9,
                height: 9,
                transform: 'rotate(45deg)',
                border: '1.5px solid var(--jpd-text-muted)',
                borderRadius: 1,
              }}
            />
            <span style={{ fontSize: 10.5, color: 'var(--jpd-text-muted)' }}>
              Diamond = milestone (point in time)
            </span>
          </span>
        </div>

        {/* ---------------------------------------------------- PAGINATION */}
        <div className="flex items-center" style={{ marginTop: 12, paddingLeft: 2, height: 34 }}>
          <span style={{ fontSize: 12.5 }}>
            Showing all {SCHEDULE_ITEMS.length} procurement items
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 12 }}>
            <span style={{ fontSize: 12.5 }}>Rows per page:</span>
            <span
              className="flex items-center justify-between"
              style={{
                width: 66,
                height: 32,
                border: '1px solid var(--jpd-border)',
                borderRadius: 6,
                padding: '0 10px',
                fontSize: 12.5,
              }}
            >
              25
              <ChevronDown size={14} strokeWidth={2} />
            </span>
          </span>
        </div>
      </main>
    </JiTproShell>
  );
}

/* ------------------------------------------------------------------ atoms */

function Btn({ children, square }: { children: React.ReactNode; square?: boolean }) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        height: 32,
        width: square ? 32 : undefined,
        padding: square ? 0 : '0 13px',
        border: '1px solid var(--jpd-border)',
        borderRadius: 6,
        fontSize: 12.5,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Rule() {
  return <div style={{ height: 1, background: '#ebebeb', marginTop: 15 }} />;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        marginTop: 13,
        color: 'var(--jpd-text-secondary)',
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ fontSize: 13.5, marginTop: 4 }}>{value}</div>
    </>
  );
}

export { STATUS_LABEL };
