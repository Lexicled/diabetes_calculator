import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: "https://diabetescalculator.basketballgamer1011.workers.dev/",
});
