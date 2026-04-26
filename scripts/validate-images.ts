import {readdir, stat} from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_OG_IMAGE_BYTES = 300 * 1024;
const MIN_OG_WIDTH = 1140;
const MAX_OG_WIDTH = 1260;
const MIN_OG_HEIGHT = 599;
const MAX_OG_HEIGHT = 661;

async function collectImageFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, {withFileTypes: true});
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(root, entry.name);

      if (entry.isDirectory()) {
        return collectImageFiles(entryPath);
      }

      return IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
    }),
  );

  return files.flat();
}

async function main() {
  const projectRoot = path.resolve(process.argv[2] ?? '.');
  const scanRoots = [path.join(projectRoot, 'src/assets'), path.join(projectRoot, 'public')];
  const failures: string[] = [];

  const imageFiles = (
    await Promise.all(
      scanRoots.map(async (root) => {
        try {
          return await collectImageFiles(root);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          failures.push(`${path.relative(projectRoot, root)}: unable to scan directory (${message})`);
          return [];
        }
      }),
    )
  ).flat();

  await Promise.all(
    imageFiles.map(async (filePath) => {
      try {
        await sharp(filePath).metadata();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${path.relative(projectRoot, filePath)}: undecodable image (${message})`);
      }
    }),
  );

  const ogImagePath = path.join(projectRoot, 'public', 'og-image.jpg');

  try {
    const [ogImageStat, ogImageMetadata] = await Promise.all([stat(ogImagePath), sharp(ogImagePath).metadata()]);

    if (ogImageStat.size > MAX_OG_IMAGE_BYTES) {
      failures.push(`public/og-image.jpg: expected <= ${MAX_OG_IMAGE_BYTES} bytes, got ${ogImageStat.size}`);
    }

    if (
      !ogImageMetadata.width ||
      !ogImageMetadata.height ||
      ogImageMetadata.width < MIN_OG_WIDTH ||
      ogImageMetadata.width > MAX_OG_WIDTH ||
      ogImageMetadata.height < MIN_OG_HEIGHT ||
      ogImageMetadata.height > MAX_OG_HEIGHT
    ) {
      failures.push(
        `public/og-image.jpg: expected dimensions within ${MIN_OG_WIDTH}-${MAX_OG_WIDTH}x${MIN_OG_HEIGHT}-${MAX_OG_HEIGHT}, got ${ogImageMetadata.width ?? 'unknown'}x${ogImageMetadata.height ?? 'unknown'}`,
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`public/og-image.jpg: missing or unreadable (${message})`);
  }

  if (failures.length > 0) {
    console.error('Image validation failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${imageFiles.length} images including public/og-image.jpg.`);
}

await main();
