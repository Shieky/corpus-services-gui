import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: '',
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true
		}
	}
});
