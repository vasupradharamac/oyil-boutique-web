#!/usr/bin/env node
/**
 * fetch-stitch-assets.mjs
 *
 * Downloads HTML code and screenshot images for the Oyil Boutique Stitch project.
 *
 * Usage:
 *   STITCH_API_KEY=your_key node fetch-stitch-assets.mjs
 *
 * Get your API key at: https://stitch.withgoogle.com/ → Profile → Stitch Settings → API Keys
 */

import { stitch } from '@google/stitch-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { createWriteStream } from 'fs';
import { get as httpsGet } from 'https';
import { join } from 'path';

const PROJECT_ID = '7089376361509542519';

const SCREENS = [
  {
    name: 'design-system',
    title: 'Design System',
    id: 'asset-stub-assets-4341ab75f35f4afc80e318b8580c6cea-1774167514679',
  },
  {
    name: 'product-detail',
    title: 'Oyil Boutique - Product Detail',
    id: '094adcc4ed6e41e0bcba2fbe8412ade4',
  },
  {
    name: 'collections',
    title: 'Oyil Boutique - Collections',
    id: '4b5fc8611a794ee8a68aedb4a560acd6',
  },
  {
    name: 'our-story',
    title: 'Oyil Boutique - Our Story',
    id: '8fa7f30dded64612b3a2b9dafa06896b',
  },
  {
    name: 'home',
    title: 'Oyil Boutique - Home',
    id: 'af8abd874b6f473b9360a68193114ff6',
  },
];

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    httpsGet(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        file.close();
        httpsGet(response.headers.location, (r) => {
          r.pipe(file);
          file.on('finish', () => { file.close(); resolve(dest); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(dest); });
      }
    }).on('error', reject);
  });
}

async function main() {
  if (!process.env.STITCH_API_KEY) {
    console.error('ERROR: STITCH_API_KEY environment variable is not set.');
    console.error('Get your key at: https://stitch.withgoogle.com/ → Profile → Stitch Settings → API Keys');
    console.error('\nUsage: STITCH_API_KEY=your_key node fetch-stitch-assets.mjs');
    process.exit(1);
  }

  const screensDir = 'stitch-screens';
  const imagesDir = join('static', 'images', 'stitch');

  ensureDir(screensDir);
  ensureDir(imagesDir);

  console.log(`Fetching ${SCREENS.length} screens from Stitch project ${PROJECT_ID}...\n`);

  const project = stitch.project(PROJECT_ID);

  for (const screen of SCREENS) {
    console.log(`Processing: ${screen.title} (${screen.id})`);

    try {
      const screenObj = await project.getScreen(screen.id);

      // Download HTML
      const htmlUrl = await screenObj.getHtml();
      if (htmlUrl) {
        const htmlDest = join(screensDir, `${screen.name}.html`);
        await downloadFile(htmlUrl, htmlDest);
        console.log(`  ✓ HTML saved to ${htmlDest}`);
      } else {
        console.log(`  - No HTML URL for ${screen.name}`);
      }

      // Download screenshot
      const imageUrl = await screenObj.getImage();
      if (imageUrl) {
        const imgDest = join(imagesDir, `${screen.name}.png`);
        await downloadFile(imageUrl, imgDest);
        console.log(`  ✓ Screenshot saved to ${imgDest}`);
      } else {
        console.log(`  - No image URL for ${screen.name}`);
      }

    } catch (err) {
      console.error(`  ✗ Failed to fetch ${screen.name}: ${err.message || err}`);
    }

    console.log('');
  }

  console.log('Done! Assets saved to:');
  console.log(`  HTML code:   ./${screensDir}/`);
  console.log(`  Screenshots: ./static/images/stitch/`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
