import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';

dotenv.config();

const GOOGLE_MAP_KEY_PLACEHOLDER = '%%GOOGLE_MAP_KEY%%';
const { GOOGLE_MAP_KEY } = process.env;
const BUILD_DIR = 'dist';

if (! GOOGLE_MAP_KEY) {
  console.error(`Error: no Google Map key found in GOOGLE_MAP_KEY environment varaible!`);
  process.exit(1);
}

try {
  await fs.rm(BUILD_DIR, { recursive: true, force: true });
} catch (e) {
  if (e.code !== 'ENOENT') {
    console.error(`Failed to clean up previous ${BUILD_DIR} directory!`);
    process.exit(1);
  }
}

console.log(`Removed previous ${BUILD_DIR} directory.`);
await fs.mkdir(BUILD_DIR);
console.log(`Created empty ${BUILD_DIR} directory.`);

await fs.cp('data', `${BUILD_DIR}/data`, { recursive: true });
await fs.cp('js', `${BUILD_DIR}/js`, { recursive: true });
console.log(`Copied data and JavaScript files to ${BUILD_DIR} directory.`);

await fs.cp('index.html', `${BUILD_DIR}/index.html`);
console.log(`Copied index.html to ${BUILD_DIR} directory.`);

// TODO update the google maps key...
const indexHTML = await fs.readFile(`${BUILD_DIR}/index.html`, { encoding: 'utf-8' });
await fs.writeFile(
  `${BUILD_DIR}/index.html`, 
  indexHTML.replace(GOOGLE_MAP_KEY_PLACEHOLDER, GOOGLE_MAP_KEY)
);

console.log(`Wrote Google Map key to ${BUILD_DIR}/index.html.`);
console.log('Done.');