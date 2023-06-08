import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@components': resolve(__dirname, 'src/components'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@libraries': resolve(__dirname, 'src/libraries'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@views': resolve(__dirname, 'src/views'),
    },
  },
});
