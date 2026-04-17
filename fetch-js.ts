import fs from 'fs';

async function test() {
  const res = await fetch("https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/");
  const text = await res.text();
  
  // Find script src
  const match = text.match(/<script type="module" crossorigin src="(.*?)"><\/script>/);
  if (match) {
    console.log("Script:", match[1]);
    const jsUrl = new URL(match[1], "https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/").toString();
    const jsRes = await fetch(jsUrl);
    const jsText = await jsRes.text();
    console.log("JS has /gallery/hero.jpg?", jsText.includes("/gallery/hero.jpg"));
    console.log("JS has hero.jpg?", jsText.includes("hero.jpg"));
    
    // Look at how hero.jpg is used
    const heroMatch = jsText.match(/.{0,50}hero\.jpg.{0,50}/g);
    console.log(heroMatch);
  }
}
test();
