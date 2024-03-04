import 'esbuild-register'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
const rootDir = path.join(__dirname, '..')
const cparRoot = path.join(rootDir, `../..`)

// @ts-ignore
export default defineConfig(async () => {

  return {
    root: rootDir,
    build: {
      minify: false,
      emptyOutDir: true,
    },
    resolve:{
      alias: {
        [`@keg-hub/jsutils`]: path.join(cparRoot, `node_modules/@keg-hub/jsutils/build/esm`),
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    worker: {
    },
  }
  
})
