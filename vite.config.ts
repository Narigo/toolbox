import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],

	server: {
		https: {
			key: readFileSync('./scripts/certs/localcert-key.pem'),
			cert: readFileSync('./scripts/certs/localcert.pem')
		},
		host: '0.0.0.0',
		port: 5173
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
