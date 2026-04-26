import fs from 'fs';
import parser from 'exif-parser';

fs.readdirSync('src/assets/gallery').forEach(f => {
  if (f.endsWith('.jpg')) {
    const buf = fs.readFileSync('src/assets/gallery/' + f);
    try {
      const result = parser.create(buf).parse();
      if (result.tags) {
        console.log(f, result.tags);
      }
    } catch (e) {}
  }
});
