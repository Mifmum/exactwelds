import fs from "fs";

async function run() {
  const res = await fetch('https://ais-dev-pd3azq66brzhguzxcs4irz-164453454409.us-east5.run.app/gallery/hero.jpg');
  const text = await res.text();
  console.log("Body length:", text.length);
  console.log("Body preview:");
  console.log(text.substring(0, 500));
}
run();