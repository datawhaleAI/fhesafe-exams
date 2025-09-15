#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy vercel.json to dist directory for deployment
const sourceFile = path.join(__dirname, '..', 'vercel.json');
const destFile = path.join(__dirname, '..', 'dist', 'vercel.json');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('✅ vercel.json copied to dist directory');
} else {
  console.log('❌ vercel.json not found in project root');
}
