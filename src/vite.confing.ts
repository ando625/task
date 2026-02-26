import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            //どこのファイルを読み込んで実行するかを指定
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
    ],

    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true, // ポートが勝手に変わらないように固定！
        hmr: {
            host: "127.0.0.1", // localhostより127.0.0.1の方が安定することが多いです
        },
    },
});