import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PremiumReactLoaders',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true, // Critical for tree-shaking
        preserveModulesRoot: 'src',
        exports: 'named',
      },
    },
    sourcemap: false, // Disabled to reduce package size
    minify: false, // Let consumers minify
  },
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {},
    devSourcemap: true, // Source maps in dev only
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
