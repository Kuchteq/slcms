<script>
        import {
                Button,
                ButtonSet,
                Column,
                ContextMenu,
                ContextMenuDivider,
                ContextMenuGroup,
                ContextMenuOption,
                Form,
                FormGroup,
                TextInput,
                Row,
                TextArea,
        } from "carbon-components-svelte";
        import { globalState, moveMode } from "$lib/state.js";
        import { Move, WatsonHealthStackedMove } from "carbon-icons-svelte";
        import BlendComposite from "./BlendComposite.svelte";
        import { onMount } from "svelte";
        export let field;
        export let lastContextedRef;
        export let sideHandlers;
</script>

{#if field.type == "composite"}
        <BlendComposite {sideHandlers} {lastContextedRef} bind:field />
{:else if field.type == "short_text"}
                <!-- Remember that the targets also have to be BINDED, not just passed as ref-->
                <TextInput
                        bind:ref={field.ref}
                        bind:value={field.value}
                        name={field.id}
                        labelText={field.label}
                        placeholder={field.placeholder}
                />
{:else if field.type == "long_text"}
                <!-- Remember that the targets also have to be BINDED, not just passed as ref-->
                <TextArea
                        bind:ref={field.ref}
                        bind:value={field.value}
                        name={field.id}
                        labelText={field.label}
                        placeholder={field.placeholder}
                />
{/if}

