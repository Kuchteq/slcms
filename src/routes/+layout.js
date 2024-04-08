import { error } from "@sveltejs/kit";

export const ssr = false;

export async function load({ params }) {
        let fetchJson = await fetch(`http://localhost:8000/cms/pages_index`);
        if (fetchJson.ok) {
                return fetchJson.json();
        } else {
                error(404, 'Not found');
        }

}
