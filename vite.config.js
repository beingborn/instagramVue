import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` 
            @use '@/styles/constants/colors' as colors;
            @use '@/styles/constants/typography' as typography;
            @use '@/styles/constants/breakpoints' as breakpoints;
            @use '@/styles/constants/box-shadows' as box-shadows;
            @use '@/styles/constants/z-indexes' as z-indexes;
            @use '@/styles/mixins/text-style' as text-style;
            @use '@/styles/mixins/responsive' as responsive;
            @use '@/styles/mixins/positions' as positions;
            @use '@/styles/mixins/flexbox' as flexbox;
            @use '@/styles/mixins/background' as background;
          `,
      },
    },
  },
})
