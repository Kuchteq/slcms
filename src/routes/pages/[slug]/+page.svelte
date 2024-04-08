<script>
        import Field from "$lib/Field.svelte";
        import { moveField } from "$lib/utils.js";
        import {
                Column,
                Form,
                Grid,
                Row,
                TextArea,
                TextInput,
        } from "carbon-components-svelte";

        export let data;

        const moveFieldWrap = (source, dest, bias) => {
                moveField(data.data, source, dest, bias);
                data.data = data.data;
        };
</script>

<Form
        id="update-form"
        on:submit={(e) => {
                fetch(`http://localhost:8000/cms/pages/${data.page_id}`, {
                        method: "POST",
                        body: JSON.stringify(data),
                }).then((res) => console.log(res));
                e.preventDefault();
        }}
>
        <Grid>
                <Row sm={8} md={4} lg={4}>
                        {#each data.data as v (v.id)}
                                <Field moveField={moveFieldWrap} bind:v />
                        {/each}
                </Row>
        </Grid>
</Form>
