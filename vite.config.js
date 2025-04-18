import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/simon-says/', // Убедись, что это название твоего репозитория
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/sounds/*.mp3', // Путь к исходным файлам
          dest: 'sounds'              // Папка в dist/ (будет dist/sounds/)
        }
      ]
    })
  ],
  build: {
    outDir: 'dist'
  }
});