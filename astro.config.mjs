// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'ja'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});