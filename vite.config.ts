/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utilities': resolve(__dirname, 'src/utilities'),
      '@views': resolve(__dirname, 'src/views'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
    },
    css: false,
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
});
