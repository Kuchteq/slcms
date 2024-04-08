import { sveltekit } from '@sveltejs/kit/vite';
import { optimizeCss } from "carbon-preprocess-svelte";
import { defineConfig } from 'vite';

export default defineConfig({
        // Optimize CSS will purge anything that's not prefixed with bx-- I think? , optimizeCss()
	plugins: [sveltekit()]
});
