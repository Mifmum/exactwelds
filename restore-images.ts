import fs from 'fs';
import path from 'path';

const images = [
  'img-marine-dock.jpg',
  'img-damaged-bumper.jpg',
  'img-aluminum-fabrication.jpg',
  'img-handrail.jpg',
  'img-truck-bumper-repaired.jpg',
  'img-plate-weld-1.jpg',
  'img-plate-weld-2.jpg',
  'img-propane-racks.jpg',
  'img-skid-steer.jpg',
  'img-service-01.webp',
  'img-service-02.webp',
  'img-stainless-steel.jpg',
  'hero.jpg'
];

async function restore() {
  const dir = path.join(process.cwd(), 'src/assets/gallery');
  fs.mkdirSync(dir, { recursive: true });

  for (const img of images) {
    const url = `https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/${img}`;
    console.log(`Downloading ${url}...`);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(path.join(dir, img), buffer);
        fs.writeFileSync(path.join(process.cwd(), 'public/gallery', img), buffer);
        console.log(`Saved ${img} (${buffer.length} bytes)`);
      } else {
        console.error(`Failed to download ${img}: ${res.statusText}`);
      }
    } catch (e) {
      console.error(`Error downloading ${img}:`, e);
    }
  }
}

restore();
