/// <reference types="vitest" />
import 'esbuild-register'
import path from 'path'
import { defineConfig } from 'vite'
import million from 'million/compiler'
import react from '@vitejs/plugin-react-swc'
import { comlink } from 'vite-plugin-comlink'
import { loadConfig } from './frontend.config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { svgrComponent } from 'vite-plugin-svgr-component'

const rootDir = path.join(__dirname, '..')
const lkRoot = path.join(rootDir, `../..`)

export default defineConfig(async () => {

  const {
    port,
    envs,
    aliases,
  } = await loadConfig()

  return {
    root: rootDir,
    build: {
      minify: false,
      emptyOutDir: true,
    },
    define: envs,
    server: {
      port,
    },
    resolve:{
      alias: {
        ...aliases,
        [`@keg-hub/jsutils`]: path.join(lkRoot, `node_modules/@keg-hub/jsutils/build/esm`),
      },
    },
    plugins: [
      million.vite({ auto: true, mute: true }),
      react(),
      comlink(),
      tsconfigPaths(),
      svgrComponent({
        svgrOptions: {
          ref: true,
          icon: true,
          expandProps: true,
          dimensions: false
        }
      }),
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
