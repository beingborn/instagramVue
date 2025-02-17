import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData : 
          ` 
            @import '@/styles/constants/colors';
            @import '@/styles/constants/typography';
            @import '@/styles/constants/breakpoints';
            @import '@/styles/constants/box-shadows';
            @import '@/styles/constants/z-indexes';

            @import '@/styles/mixins/text-style';
            @import '@/styles/mixins/responsive';
            @import '@/styles/mixins/positions';
            @import '@/styles/mixins/flexbox';
            @import '@/styles/mixins/background';
          `
      }
    }
  }
})
