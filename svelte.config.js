import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { optimizeImports } from "carbon-preprocess-svelte";
import { preprocess } from 'svelte/compiler';

export default {
        preprocess: [
                vitePreprocess(),
                optimizeImports()
        ],
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: "index.html",
			precompress: false,
			strict: true
		})
	}
};
