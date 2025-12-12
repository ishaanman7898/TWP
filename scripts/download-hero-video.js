import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_URL = 'https://www.youtube.com/watch?v=n1mOxhYdYVQ';
const START_TIME = '1:23';
const END_TIME = '2:07';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'HeroVideo.mp4');
const TEMP_FILE = path.join(__dirname, '..', 'public', 'temp-download.mp4');

console.log('Starting video download and processing...\n');

try {
  // Step 1: Download the video
  console.log('Step 1: Downloading video from YouTube...');
  execSync(`yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --merge-output-format mp4 -o "${TEMP_FILE}" "${VIDEO_URL}"`, {
    stdio: 'inherit'
  });
  console.log('✓ Download complete!\n');

  // Step 2: Trim the video
  console.log('Step 2: Trimming video from 1:23 to 2:07...');
  execSync(`ffmpeg -i "${TEMP_FILE}" -ss ${START_TIME} -to ${END_TIME} -c:v libx264 -c:a aac -y "${OUTPUT_FILE}"`, {
    stdio: 'inherit'
  });
  console.log('✓ Trimming complete!\n');

  // Step 3: Clean up temp file
  console.log('Step 3: Cleaning up temporary files...');
  if (fs.existsSync(TEMP_FILE)) {
    fs.unlinkSync(TEMP_FILE);
  }
  console.log('✓ Cleanup complete!\n');

  console.log(`✓ Success! HeroVideo.mp4 has been created in the public folder.`);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
