/**
 * A full-width photographic transition between the first concrete
 * explanation of JiTpro's work and the lower-homepage argument — the field
 * the copy keeps pointing at, shown as a working jobsite.
 *
 * Presentation mirrors the approved below-hero photograph's stacked tier
 * (§17.1): full container width on the shared horizontal ladder, the native
 * 16:9 composition uncropped at lg, and the established cinematic crops
 * (2:1, then 21:9) below it via object-fit. No mask — the reference's
 * dissolve exists only where text overlaps the image, which never happens
 * here. No caption, border, card, filter, or animation. The explicit aspect
 * ratios reserve the layout, so lazy loading (approved — this sits well
 * below the initial viewport) cannot shift the page.
 *
 * No vertical padding of its own: the sections above and below already
 * carry the page rhythm, and the band reads as part of the flow rather
 * than an inserted card.
 */
export default function HomeConstructionImage() {
  return (
    <section className="bg-jp-background px-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <img
          src={`${import.meta.env.BASE_URL}assets/homepage_const-1600.webp`}
          srcSet={`${import.meta.env.BASE_URL}assets/homepage_const-800.webp 800w, ${import.meta.env.BASE_URL}assets/homepage_const-1600.webp 1600w`}
          sizes="(min-width: 1280px) 1280px, 100vw"
          width={1600}
          height={900}
          alt="Crane setting structural steel on an active jobsite while crews work across the foundations"
          loading="lazy"
          decoding="async"
          className="aspect-[2/1] w-full object-cover object-[50%_55%] sm:aspect-[21/9] lg:aspect-video"
        />
      </div>
    </section>
  );
}
