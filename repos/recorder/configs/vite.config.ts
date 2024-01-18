import 'esbuild-register'
import path from 'path'
import { defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'
import tsconfigPaths from 'vite-tsconfig-paths'


const rootDir = path.join(__dirname, '..')
// @ts-ignore
export default defineConfig(async () => {
  return {
    root: rootDir,
    build: {
      minify: false,
      emptyOutDir: true,
      lib: {
        entry: path.resolve(__dirname, '../src/index.ts'),
        name: 'RaceEditor',
        fileName: 'raceEditor',
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'react',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      },
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    plugins: [
      comlink(),
      tsconfigPaths(),
    ],
    worker: {
      plugins: () => [comlink()]
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: 'scripts/setup',
      include: ['**/test.{ts,tsx}']
    }
  }

})


