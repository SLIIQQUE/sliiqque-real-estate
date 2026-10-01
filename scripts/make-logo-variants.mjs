// Builds the web logo assets in public/brand from the supplied SLIIQQUE_LOGO folder.
// Usage: node scripts/make-logo-variants.mjs [path-to-SLIIQQUE_LOGO]
// Only the Product & Engineering lockup and the master icon are used (never the Creative Studio variants).
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const SRC =
  process.argv[2] ?? path.join(homedir(), "Downloads", "SLIIQQUE_LOGO");
const OUT = path.join(process.cwd(), "public", "brand");
const CREAM = [255, 251, 246];

/** Recolour everything that is not the blue accent to cream, keeping alpha, for dark backgrounds. */
async function lightVersion(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, , b] = [data[i], data[i + 1], data[i + 2]];
    const isBlueAccent = b - r > 50;
    if (!isBlueAccent) [data[i], data[i + 1], data[i + 2]] = CREAM;
  }
  await sharp(data, { raw: info }).png().toFile(output);
}

await mkdir(OUT, { recursive: true });

const product = path.join(SRC, "master-product-fixed-tight.png");
const icon = path.join(SRC, "master-icon_large-transparent.png");

await sharp(product).trim().png().toFile(path.join(OUT, "product-dark.png"));
await sharp(icon).trim().png().toFile(path.join(OUT, "icon-dark.png"));
await lightVersion(
  path.join(OUT, "product-dark.png"),
  path.join(OUT, "product-light.png"),
);
await lightVersion(
  path.join(OUT, "icon-dark.png"),
  path.join(OUT, "icon-light.png"),
);

console.log("Logo assets written to", OUT);

// ---- Favicons, app icons and social image -------------------------------------------------
// Transparent black marks vanish on dark browser tabs, so the favicon set uses a deep-green tile
// with the cream QQ icon (the blue accent is kept).
const GREEN = { r: 16, g: 46, b: 38, alpha: 1 };
const iconLight = path.join(OUT, "icon-light.png");

async function tile(size, file, { rounded = true, padding = 0.2 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(iconLight)
    .resize({ width: inner, height: inner, fit: "inside" })
    .png()
    .toBuffer();
  const radius = rounded ? Math.round(size * 0.22) : 0;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`,
  );
  const base = await sharp({
    create: { width: size, height: size, channels: 4, background: GREEN },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
  await sharp(base)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(file);
}

await tile(16, path.join(OUT, "favicon-16.png"), { padding: 0.12 });
await tile(32, path.join(OUT, "favicon-32.png"), { padding: 0.14 });
await tile(48, path.join(OUT, "favicon-48.png"), { padding: 0.16 });
await tile(192, path.join(OUT, "favicon-192.png"));
await tile(512, path.join(OUT, "icon-512.png"));
// Opaque, square tile for iOS home screens (the OS rounds the corners itself).
await tile(180, path.join(OUT, "apple-touch-icon.png"), { rounded: false });

// favicon.ico with 16, 32 and 48 px PNG entries.
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(path.join(OUT, `favicon-${s}.png`)).toBuffer()),
);
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e[0] = sizes[i];
  e[1] = sizes[i];
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
await writeFile(
  path.join(process.cwd(), "app", "favicon.ico"),
  Buffer.concat([header, ...entries, ...pngs]),
);

// 1200x630 social preview: the Product & Engineering lockup on the brand green.
const lockup = await sharp(path.join(OUT, "product-light.png"))
  .resize({ width: 760 })
  .png()
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: GREEN },
})
  .composite([{ input: lockup, gravity: "center" }])
  .png()
  .toFile(path.join(OUT, "og.png"));
console.log("Favicons, app icons, favicon.ico and og.png written");
