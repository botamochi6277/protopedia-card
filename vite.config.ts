import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://qiita.com/tat_mae084/items/4051c61926dc8165e80b
export default defineConfig({
  base: process.env.GITHUB_PAGES  // この行を追加
        ? "protopedia-card"            // この行を追加
        : "./",                     // この行を追加
  plugins: [react()],
})
