import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// TODO: Добавить оптимизацию сборки для production
export default defineConfig({
  base: '/simon-says/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    // FIXME: Добавить проверку существования файлов перед копированием
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
    outDir: 'dist',
    assetsDir: '.', // Помещаем assets в корень
    // TODO: Добавить source maps для development
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
});