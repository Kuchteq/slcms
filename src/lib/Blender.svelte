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
                Grid,
        } from "carbon-components-svelte";
        import {
                globalState,
                moveMode,
                addMode,
                elementModalType,
                elementModalFields,
        } from "$lib/state.js";

        // import  TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte"
        import {
                CopyFile,
                Cut,
                Delete,
                Move,
                WatsonHealthStackedMove,
        } from "carbon-icons-svelte";
        import BlendPiece from "./BlendPiece.svelte";
        import { get } from "svelte/store";
        import { afterUpdate, onMount } from "svelte";
        import { getSpotFromRef, extractRefs, removeRefs } from "$lib/utils.js";
        /**
         * @type {any}
         */
        export let result;
        let targets;
        let lastContextedRef;
        const moveBefore = (beforeObj) => {
                const spotToDelete = getSpotFromRef(
                        result.data,
                        lastContextedRef,
                );
                const spotTempDeleted = spotToDelete.arr.splice(
                        spotToDelete.index,
                        1,
                )[0];
                const spotBefore = getSpotFromRef(result.data, beforeObj.ref);
                spotBefore.arr.splice(spotBefore.index, 0, spotTempDeleted);
                moveMode.set(false);
                targets = extractRefs(result.data);
        };

        const moveToEnd = (end) => {
                const spotToDelete = getSpotFromRef(
                        result.data,
                        lastContextedRef,
                );
                const spotTempDeleted = spotToDelete.arr.splice(
                        spotToDelete.index,
                        1,
                )[0];
                const endSpot = getSpotFromRef(result.data, end.ref);
                endSpot.arr.push(spotTempDeleted);
                moveMode.set(false);
                targets = extractRefs(result.data);
        };
        const moveAppend = (field) => {
                console.log(lastContextedRef);
                console.log(result);
                const spotToDelete = getSpotFromRef(
                        result.data,
                        lastContextedRef,
                );
                console.log(spotToDelete);
                const spotTempDeleted = spotToDelete.arr.splice(
                        spotToDelete.index,
                        1,
                )[0];
                field.push(spotTempDeleted);
                moveMode.set(false);
                targets = extractRefs(result.data);
        };
        const moveFunctions = {
                before: moveBefore,
                after: moveToEnd,
                append: moveAppend,
        };

        const addBefore = (before) => {
                const spotBefore = getSpotFromRef(result.data, before.ref);
                let toAddElement = get(elementModalFields);
                toAddElement.type = get(elementModalType);
                spotBefore.arr.splice(spotBefore.index, 0, toAddElement);
                addMode.set(false);
                targets = extractRefs(result.data);
        };

        const addAfter = (after) => {
                const endSpot = getSpotFromRef(result.data, after.ref);
                let toAddElement = get(elementModalFields);
                toAddElement.type = get(elementModalType);
                endSpot.arr.push(toAddElement);
                addMode.set(false);
                targets = extractRefs(result.data);
        };
        const addAppend = (field) => {
                let toAddElement = get(elementModalFields);
                toAddElement.type = get(elementModalType);
                field.push(toAddElement);
                addMode.set(false);
                targets = extractRefs(result.data);
        };

        const addFunctions = {
                before: addBefore,
                after: addAfter,
                append: addAppend,
        };
        let modeFuncs = moveFunctions;
        addMode.subscribe((v) => {
                modeFuncs = v ? addFunctions : moveFunctions;
        });
        onMount(() => {
                targets = extractRefs(result.data);
        });
        afterUpdate(() => {});
</script>

<Form
        id="update-form"
        on:submit={(e) => {
                fetch("http://localhost:8000/cms/landing_page", {
                        method: "POST",
                        body: JSON.stringify(result),
                }).then((res) => console.log(res));
                e.preventDefault();
        }}
>
        {#each result.data as value (value.id)}
                {#if $moveMode || $addMode}
                        <Row class="center">
                                <Button
                                        on:click={() => modeFuncs.before(value)}
                                        size="small"
                                        class="move-button-outer"
                                        iconDescription="Move here"
                                        icon={WatsonHealthStackedMove}
                                />
                        </Row>
                {/if}
                <BlendPiece
                        field={value}
                        {lastContextedRef}
                        sideHandlers={modeFuncs}
                />
        {/each}

        {#if $moveMode || $addMode}
                <Row class="center">
                        <Button
                                on:click={() => modeFuncs.append(result.data)}
                                size="small"
                                iconDescription="Move here"
                                icon={WatsonHealthStackedMove}
                        />
                </Row>
        {/if}
</Form>
<ContextMenu
        target={targets}
        on:open={(e) => {
                lastContextedRef = e.detail;
                console.log(result);
        }}
>
        <ContextMenuOption
                indented
                labelText="Move"
                icon={Move}
                on:click={() => moveMode.set(true)}
        />
        <ContextMenuOption indented labelText="Delete" icon={Delete} />
</ContextMenu>

<style>
        :global(.move-button-outer) {
                margin-top: 0.5rem;
        }
</style>
