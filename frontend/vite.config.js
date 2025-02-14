import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // This makes the server accessible from other devices on the network
    port: 5173,       // Or whatever port you’re using
  }
})