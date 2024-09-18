import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  server:{
    port:8088
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    chunkSizeWarningLimit:1500,//防止超出500kb提示警告,设置成1500KB
    //使用npm install terser -D下载，配置如下，清除console和debugger
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true
      }
    }
  }
})
