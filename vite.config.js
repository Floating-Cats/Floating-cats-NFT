import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
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
  build: {
    outDir: 'build',
  },
  plugins: [tsconfigPaths()],
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
