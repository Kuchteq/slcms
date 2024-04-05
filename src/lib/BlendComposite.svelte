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
        import { moveMode, addMode } from "$lib/state.js";
        import { Move, WatsonHealthStackedMove } from "carbon-icons-svelte";
        import BlendPiece from "./BlendPiece.svelte";
        export let field;
        export let lastContextedRef;
        export let sideHandlers;
</script>

<div class="bordered">
        <Row>
                <h3 bind:this={field.ref}>{field.label}</h3>
                {#if field.data < 1 && ($addMode || $moveMode)}
                        <Button
                                on:click={(e) => {
                                        sideHandlers.append(field.data);
                                }}
                                class="moveToSideButton"
                                size="small"
                                iconDescription="Move here"
                                icon={WatsonHealthStackedMove}
                        />{/if}
        </Row>
        <Row>
                {#each field.data as v, i (v.id)}
                        <Column sm={8} md={4} lg={4}>
                                <div class="wrapper">
                                        {#if $addMode || ($moveMode == true && lastContextedRef != v.ref && (i == 0 || (i - 1 >= 0 && lastContextedRef != field.data[i - 1].ref)))}
                                                <Button
                                                        on:click={(e) => {
                                                                sideHandlers.before(
                                                                        v,
                                                                );
                                                        }}
                                                        class="moveToSideButton"
                                                        size="small"
                                                        iconDescription="Move here"
                                                        icon={WatsonHealthStackedMove}
                                                />
                                        {/if}
                                        <!-- Remember that the targets also have to be BINDED, not just passed as ref-->
                                        <BlendPiece
                                                {sideHandlers}
                                                {lastContextedRef}
                                                field={v}
                                        />
                                        {#if ($addMode && i + 1 == field.data.length) || ($moveMode == true && field.data.length == i + 1 && lastContextedRef != v.ref)}
                                                <Button
                                                        on:click={(e) => {
                                                                sideHandlers.after(
                                                                        v,
                                                                );
                                                        }}
                                                        class="move-to-side-right"
                                                        size="small"
                                                        iconDescription="Move here"
                                                        icon={WatsonHealthStackedMove}
                                                />
                                        {/if}
                                </div>
                        </Column>
                {/each}
        </Row>
</div>

<style>
        :global(.center) {
                justify-content: center;
        }
        :global(.moveToSideButton) {
                height: fit-content;
                margin-top: 0.5rem;
                margin-right: 0.25rem;
        }

        :global(.move-to-side-right) {
                height: fit-content;
                margin-top: 0.5rem;
                margin-left: 0.25rem;
        }
        .wrapper {
                display: flex;
        }
        h3 {
                margin-left: 1rem;
        }
        .bordered {
                margin: 1rem 0;
                border: 1px solid #000;
                padding: 1rem;
        }
</style>
