import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/React-Movie-Search/',
  plugins: [react()]
})
