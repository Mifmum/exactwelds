import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  for (let i = 1; i <= 9; i++) {
    const file = `src/assets/gallery/work-${i}.jpg`;
    const buffer = fs.readFileSync(file);
    const filePart = {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType: "image/jpeg"
      }
    };
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            filePart,
            "Describe the metalwork/welding/vehicle/trailer/equipment in 3 to 5 words."
        ]
      });
      console.log(`work-${i}:`, response.text);
    } catch (e) {
      console.error(`Error on work-${i}:`, e.message);
    }
  }
}
run();
