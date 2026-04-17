async function test() {
  const urls = [
    "https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/img-aluminum-fabrication.jpg",
    "https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/hero.jpg"
  ];
  for (const url of urls) {
    const res = await fetch(url);
    console.log(url, res.status, res.headers.get("content-type"));
  }
}
test();
