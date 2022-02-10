import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default {
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  // plugins: [vue()],
  plugins: [react()],
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
