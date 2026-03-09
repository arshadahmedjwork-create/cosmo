import fs from 'fs';

const cols = 14;
const rows = 5;
const patternW = 5800;
const patternH = 2200;

const cellW = Math.floor(patternW / cols);
const cellH = Math.floor(patternH / rows);

let out = "";
for (let r = 0; r < rows; r++) {
    out += `  // Row ${r + 1}\n`;
    for (let c = 0; c < cols; c++) {
        // Random offset within the cell to scatter them
        const rx = 0.05 + Math.random() * 0.45;
        const ry = 0.05 + Math.random() * 0.45;

        let x = Math.floor(c * cellW + rx * cellW);
        let y = Math.floor(r * cellH + ry * cellH);
        let size = Math.floor(140 + Math.random() * 100); // 140-240 size
        out += `  { x: ${x}, y: ${y}, size: ${size} },\n`;
    }
}
fs.writeFileSync('A:\\cosmo\\blocks.txt', out);
