<script>
        import {
                Button,
                Column,
                Form,
                FormGroup,
                Row,
                TextInput,
        } from "carbon-components-svelte";
        import { globalState } from "$lib/state.js";
        /**
         * @type {any}
         */

        export let result;
</script>

<Form
        id="update-form"
        on:submit={(e) => {
                console.log("submit", e);
                console.log(JSON.stringify(result));
                fetch("http://localhost:8000/cms/landing_page", {
                        method: "POST",
                        body: JSON.stringify(result),
                }).then((res) => console.log(res));
                e.preventDefault();
        }}
>
        {#each result.data as value}
                <Row>
                        <h3>{value.label}</h3>
                </Row>
                <Row>
                        {#each value.data as v}
                                <Column noGutterLeft>
                                        <TextInput
                                                bind:value={v.value}
                                                name={v.id}
                                                labelText={v.label}
                                                placeholder="Enter main header..."
                                        />
                                </Column>
                        {/each}
                </Row>
        {/each}
</Form>
