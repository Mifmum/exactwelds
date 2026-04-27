import fs from "fs";

async function run() {
  const images = [
    "hero.jpg",
    "img-aluminum-fabrication.jpg",
    "img-damaged-bumper.jpg",
    "img-handrail.jpg",
    "img-marine-dock.jpg",
    "img-plate-weld-1.jpg",
    "img-plate-weld-2.jpg",
    "img-propane-racks.jpg",
    "img-service-01.webp",
    "img-service-02.webp",
    "img-skid-steer.jpg",
    "img-stainless-steel.jpg",
    "img-truck-bumper-repaired.jpg"
  ];
  
  for (const img of images) {
    const url = `https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/${img}`;
    const res = await fetch(url);
    console.log(`${img} -> ${res.status} ${res.headers.get("content-type")} ${res.headers.get("content-length")}`);
  }
}
run();
