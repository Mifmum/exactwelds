import fs from "fs";

async function run() {
  const res = await fetch('http://localhost:3000/gallery/hero.jpg');
  console.log(res.status, res.headers.get('content-type'), res.headers.get('content-length'));
  const buf = await res.arrayBuffer();
  console.log("Buffer length:", buf.byteLength);
}
run();
