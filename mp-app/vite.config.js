import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://ping0521.github.io/my-profolio/mp-app/
export default defineConfig({
  plugins: [react()],
  base: '/my-profolio/mp-app/',
})
