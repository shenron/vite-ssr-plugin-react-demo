// This is a simple Node server that uses the built project.

import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import path from 'path';
import express from 'express';

// This contains a list of static routes (assets)
import packageJon from '../dist/server/package.json';

// The manifest is required for preloading assets
import manifest from '../dist/client/ssr-manifest.json';

import api from './api.mjs';

global.fetch = fetch;

// This is the server renderer we just built
const main = import('../dist/server/main.js');

const server = express();

// we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve every static asset route
(packageJon.ssr.assets || []).forEach((asset) => {
  server.use(
    `/${asset}`,
    express.static(path.join(__dirname, `../dist/client/${asset}`)),
  );
});

// Custom API to get data for each page
// See client/main.js to see how this is called
api.forEach(({ route, handler }) => server.get(route, handler));

// Everything else is treated as a "rendering request"
server.get('*', async (req, res) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const renderPage = (await main).default.default;

  const { html } = await renderPage(url, {
    manifest,
    preload: true,
  });

  res.setHeader('Cache-Control', 'max-age=0');
  res.end(html);
});

const port = 8080;
console.log(`Server started: http://localhost:${port}`);
server.listen(port);
