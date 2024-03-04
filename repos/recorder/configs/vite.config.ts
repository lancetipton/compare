import type { UserConfig } from 'vite'
import 'esbuild-register'

import path from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import { comlink } from 'vite-plugin-comlink'
import tsconfigPaths from 'vite-tsconfig-paths'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

const root = path.join(__dirname, `..`)

export default defineConfig(async () => {
  return {
    root,
    output: {
      entryFileNames: `[name].js`,
      assetFileNames: `assets/[name][extname]`,
    },
    build: {
      minify: false,
      emptyOutDir: true,
      copyPublicDir: false,
      lib: {
        name: `Compare`,
        formats: [`es`, `cjs`],
        entry: path.resolve(root, `src/init.ts`),
        fileName: (format:string) => `Compare.${format}.js`,
      },
      rollupOptions: {
        external: [`react`, `react-dom`, `react/jsx-runtime`],
        output: {
          globals: {
            react: `react`,
            [`react-dom`]: `ReactDOM`,
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: `esnext`
      },
    },
    esbuild: {
      logOverride: { [`this-is-undefined-in-esm`]: `silent` }
    },
    plugins: [
      comlink(),
      tsconfigPaths(),
      libInjectCss(),
      dts(),
    ],
    worker: {
      plugins: () => [comlink()]
    },
    test: {
      globals: true,
      environment: `happy-dom`,
      setupFiles: `scripts/setup`,
      include: [`**/test.{ts,tsx}`]
    }
  } as UserConfig
})


