import { client } from "@gradio/client";
import * as fs from "fs";

async function run() {
    try {
        const app = await client("nielsr/comparing-captioning-models");
        for (let i = 1; i <= 9; i++) {
            const buf = fs.readFileSync(`src/assets/gallery/work-${i}.jpg`);
            const blob = new Blob([buf], { type: "image/jpeg" });
            const result = await app.predict("/predict", [
                blob,
            ]);
            console.log(`work-${i}:`, result.data);
        }
    } catch (e) {
        console.error(e);
    }
}
run();
