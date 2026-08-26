import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/pizza-bona-site/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'loose-towns-mate.loca.lt',
      'shaggy-cases-hammer.loca.lt',
    ],
  },
})
