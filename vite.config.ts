/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())

	return {
		plugins: [react(), tsconfigPaths()],
		envPrefix: 'VITE_',
		cacheDir: '.vite',
		esbuild: {
			keepNames: true,
		},
		resolve: {
			alias: {
				lodash: 'lodash-es',
			},
		},
		server: {
			host: true,
			port: 4173,
			strictPort: true,
			proxy: {
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			rollupOptions: {
				plugins: [
					visualizer({
						open: true,
						gzipSize: true,
						emitFile: false,
						filename: '.vite/stats.html',
					}),
				],
			},
		},
	}
})
