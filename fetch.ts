async function test() {
  const res = await fetch("https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/hero.jpg");
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
  const text = await res.text();
  console.log("Body preview:", text.substring(0, 200));
}
test();
