import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'build',
    // Disable source-maps in the production image build — halves peak memory
    sourcemap: false,
    rollupOptions: {
      // Limit concurrent file reads so Rollup doesn't balloon RSS
      maxParallelFileOps: 2,
      output: {
        // Split heavy vendor deps into separate chunks so Rollup can flush
        // each independently.  Keeps peak RSS well below the 2 GB heap cap.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          // Firebase SDK is the single largest dependency tree
          if (id.includes('firebase')) return 'vendor-firebase';

          // Charting / visualisation libs
          if (id.includes('recharts') || id.includes('d3-') || id.includes('visx'))
            return 'vendor-charts';

          // Calendar / scheduling
          if (id.includes('fullcalendar') || id.includes('gantt-task-react'))
            return 'vendor-calendar';

          // React core + router
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('/react/')
          )
            return 'vendor-react';

          // Everything else from node_modules
          return 'vendor';
        },
      },
    },
  }
})
