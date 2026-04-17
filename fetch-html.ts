async function test() {
  const res = await fetch("https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/");
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body preview has /gallery/hero.jpg?", text.includes("/gallery/hero.jpg"));
}
test();
