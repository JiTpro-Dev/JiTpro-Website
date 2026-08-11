/**
 * The page's thesis, set alone between the problem argument and the product
 * sections. Centered as an approved editorial pause — the departure from the
 * site's shared left edge is the signal that the page is turning from problem
 * to answer (Design System §7.7 centered editorial statement exception, §48.6;
 * Decision Log 2026-08-08).
 *
 * A <p>, not a heading element: it is an emphasis line behaving as a heading
 * per §7.7's typeface table, and keeping it out of the H2 outline preserves
 * the document structure for assistive technology.
 */
export default function HomeThesisStatement() {
  return (
    <section className="bg-jp-background px-6 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="mx-auto max-w-[26ch] text-center font-heading text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.022em] text-balance text-jp-text-primary sm:text-[2.5rem] sm:leading-[1.08] lg:text-[3.25rem] min-[1440px]:text-[3.75rem] min-[1440px]:leading-[1.06]">
          JiTpro builds control early—while there is still time to protect the field.
        </p>
      </div>
    </section>
  );
}
