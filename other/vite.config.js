import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') }
      ]
    })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  }
})