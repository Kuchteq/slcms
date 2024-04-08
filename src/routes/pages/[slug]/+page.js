import { error } from '@sveltejs/kit';


export async function load({ params }) {
        let fetchJson = await fetch(`http://localhost:8000/cms/pages/${params.slug}`);
        if (fetchJson.ok) {
                let data = await fetchJson.json();
                data.page_id = params.slug
                return data
        } else {
                error(404, 'Not found');
        }

}
