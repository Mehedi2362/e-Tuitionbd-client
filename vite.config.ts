import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        base: '/',
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3000,
            open: true,
        },
        build: {
            outDir: 'dist',
        },
        define: {
            __APP_VERSION__: JSON.stringify(env.npm_package_version || '0.0.0'),
        },
    }
})
