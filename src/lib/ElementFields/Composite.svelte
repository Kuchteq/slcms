<script>
        import {
                Grid,
                Row,
                Column,
                Tag,
                TextInput,
        } from "carbon-components-svelte";
        import {
                elementModalOpen,
                elementModalType,
                elementModalFields,
                addMode,
        } from "$lib/state.js";
        import { get } from "svelte/store";

        export let fieldsState;
        fieldsState.data = []
</script>

<Grid>
        <Row padding={true}>
                <Column noGutterLeft>
                        <TextInput
                                light
                                bind:value={fieldsState.id}
                                name={"id"}
                                labelText={"id"}
                                placeholder="Enter id"
                        />
                </Column>
                <Column>
                        <TextInput
                                light
                                bind:value={fieldsState.label}
                                name={"label"}
                                labelText={"label"}
                                placeholder="Enter label"
                        />
                </Column>
        </Row>
</Grid>
