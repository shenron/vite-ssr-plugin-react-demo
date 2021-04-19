import { defineConfig } from 'vite'
import viteSSR from 'vite-ssr/plugin.js'
import reactRefresh from '@vitejs/plugin-react-refresh'
import api from './back/api.mjs'

export default defineConfig({
  entry: 'client/main',
  plugins: [
    viteSSR(),
    reactRefresh(),
    {
      // Mock API during development
      configureServer({ middlewares }) {
        api.forEach(({ route, handler }) => middlewares.use(route, handler))
      },
    },
  ],
})

