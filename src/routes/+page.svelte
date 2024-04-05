<script>
        import Blender from "$lib/Blender.svelte";
        import {
                Grid,
                Row,
                Column,
                HeaderPanelDivider,
                Loading,
        } from "carbon-components-svelte";
        let fetchJson = fetch("http://localhost:8000/cms/landing_page").then(
                (res) => res.json(),
        );
</script>

<Grid>
        <Row>
                <Column noGutter>
                        <h1>Landing Page</h1>
                </Column>
        </Row>
        {#await fetchJson}
                <Loading />
        {:then result}
                <Blender {result} />
        {/await}
</Grid>

<style>
        h1 {
                border-bottom: 1px solid #000;
                padding-bottom: 1rem;
                margin-bottom: 2rem;
        }
        :global(.bottom-field-modifier) {
                position: fixed;
                bottom: 0;
                border: 1px solid #000;
        }
</style>
