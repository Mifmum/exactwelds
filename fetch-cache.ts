async function test() {
  const res = await fetch("https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/gallery/hero.jpg", {
    headers: { "cache-control": "no-cache" }
  });
  console.log("CF-Cache-Status:", res.headers.get("cf-cache-status"));
  console.log("Age:", res.headers.get("age"));
}
test();
