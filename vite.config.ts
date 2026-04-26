import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type PluginOption} from 'vite';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const resolvedSiteUrl = process.env.VITE_SITE_URL?.trim() || env.VITE_SITE_URL?.trim();

  if (mode === 'development' && !resolvedSiteUrl) {
    process.env.VITE_SITE_URL = 'http://localhost:3000';
  }

  const siteUrlGuard: PluginOption = {
    name: 'site-url-guard',
    configResolved(config) {
      const siteUrl = process.env.VITE_SITE_URL?.trim() || loadEnv(config.mode, '.', '').VITE_SITE_URL?.trim();

      if (config.mode === 'production' && !siteUrl) {
        throw new Error(
          'VITE_SITE_URL is required for production builds; set it in .env.local, .env.production, or your shell environment.',
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
