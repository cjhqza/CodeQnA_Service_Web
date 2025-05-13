import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入node提供内置模块path：可以获取绝对路径
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [vue()],
  // src文件夹配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
})
