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
  plugins: [react(), tsconfigPaths()],
  compilerOptions: {
    types: ['vite/client'],
  },
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
