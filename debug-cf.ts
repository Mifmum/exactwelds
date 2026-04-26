import fs from "fs";
import { execSync } from "child_process";

async function run() {
  // Let's actually pull the page and see what's physically in the HTML src tags
  const res = await fetch("https://cloudflare-workers-autoconfig-exactwelds.trevor-shep.workers.dev/");
  const html = await res.text();
  console.log("HTML:", html.substring(0, 1000));
}
run();
