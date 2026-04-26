import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type PluginOption} from 'vite';

import { cloudflare } from "@cloudflare/vite-plugin";

import { normalizeSiteUrl } from './src/lib/site-url';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const resolvedSiteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? env.VITE_SITE_URL);

  if (mode === 'development' && !resolvedSiteUrl) {
    process.env.VITE_SITE_URL = 'http://localhost:3000';
  } else if (resolvedSiteUrl) {
    process.env.VITE_SITE_URL = resolvedSiteUrl;
  }

  const siteUrlGuard: PluginOption = {
    name: 'site-url-guard',
    configResolved(config) {
      if (config.mode !== 'production') return;

      const raw = process.env.VITE_SITE_URL ?? loadEnv(config.mode, '.', '').VITE_SITE_URL;
      if (!normalizeSiteUrl(raw)) {
        throw new Error(
          'VITE_SITE_URL must be set to an absolute http(s) URL for production builds (e.g., https://exactwelds.com); set it in .env.local, .env.production, or your shell environment.',
        );
      }
    },
  };

  return {
    plugins: [react(), tailwindcss(), cloudflare(), siteUrlGuard],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
