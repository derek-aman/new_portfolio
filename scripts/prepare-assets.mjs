import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'c:\\Users\\Aman Kumar\\Downloads\\sequence_frames_new';
const outputDir = path.join(process.cwd(), 'public', 'sequence');

async function processFrames() {
  await fs.mkdir(outputDir, { recursive: true });
  const files = await fs.readdir(inputDir);
  const pngFiles = files.filter(f => f.endsWith('.png')).sort();
  
  console.log(`Found ${pngFiles.length} PNGs. Converting to WebP...`);
  
  for (let i = 0; i < pngFiles.length; i++) {
    const filename = pngFiles[i];
    // Create '0001.webp' etc
    const outputName = `${String(i + 1).padStart(4, '0')}.webp`;
    
    await sharp(path.join(inputDir, filename))
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, outputName));
    
    if (i % 20 === 0) console.log(`Processed ${i} frames...`);
  }
  
  console.log('Finished converting all frames!');
}

processFrames().catch(console.error);
