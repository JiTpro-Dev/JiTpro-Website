# Source assets

Original captures and exports that are **not** served. Nothing here is
referenced by the site, and nothing here is copied into `dist/` — that is the
whole point of the directory.

`public/assets/` holds the derived files the site actually loads. Keep the
originals here so a WebP can be regenerated at a different size or quality
without re-exporting from the source tool.

## methodology/

The JiTpro interface captures behind the homepage methodology figure
(`src/components/home/MethodologyFigure.tsx`). 1448x1086, 4:3.

Derived files in `public/assets/methodology/`, generated with:

```sh
ffmpeg -i <name>.png -vf scale=1448:-1 -c:v libwebp -quality 82 <name>-1448.webp
ffmpeg -i <name>.png -vf scale=800:-1  -c:v libwebp -quality 80 <name>-800.webp
```

Filenames match the stage `id` in `src/content/methodologyStages.ts`. Stages
`product-register` and `backward-scheduling` have no capture yet and render the
reserved placeholder.
