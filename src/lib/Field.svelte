<script>
        import { TextArea, TextInput } from "carbon-components-svelte";
        /**
         * @type {{ type: string; label: any; value: any; }}
         */
        export let v;
        export let moveField;
        let overSide = "";
        let currentlyDragged = false;
        const dragStart = (e) => {
                e.dataTransfer.effectAllowed = "move";
                currentlyDragged = true;
                // WE FUCKING NEEED TO SET SOME FUCKING DATA OR ELSE THE ONDROP CUNT WONT FIRE
                e.dataTransfer.setData("application/json", JSON.stringify(v));
        };
        const dragEnter = (e) => {
                if (e.target.classList.contains("right-side")) {
                        overSide = "right";
                        return;
                }
                overSide = "left";
        };
        const dragLeave = (e) => {
                const element = e.currentTarget; // Get the current element
                // Check if the related target is a child of the handler element
                if (e.relatedTarget && element.contains(e.relatedTarget)) {
                        return; // Ignore the event if moving over a child element
                }
                overSide = "";
        };
        const dragOver = (e) => {
                // For some reason we also need this
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
        };
        const drop = (e) => {
                e.preventDefault();
                e.stopPropagation();

                let bias = 0;
                if (e.target.classList.contains("right-side")) {
                        bias = 1;
                }
                moveField(
                        JSON.parse(e.dataTransfer.getData("application/json")),
                        v,
                        bias,
                );
                overSide = "";
                return false;
        };
</script>

<div
        class="draggable-container"
        class:draggable-hovering-left={overSide == "left"}
        class:draggable-hovering-right={overSide == "right"}
        class:dragged-item={currentlyDragged}
        on:dragstart={dragStart}
        on:dragover={dragOver}
        on:dragenter={dragEnter}
        on:dragleave={dragLeave}
        on:drop={drop}
        on:dragend={()=>currentlyDragged=false}
        draggable="true"
>
        {#if v.type == "short_text"}
                <TextInput labelText={v.label} bind:value={v.value} />
        {:else if v.type == "long_text"}
                <TextArea labelText={v.label} bind:value={v.value} />
        {/if}
        <div class="side right-side"></div>
</div>

<style>
        .dragged-item {
                opacity: 0.5;
        }
        .draggable-container {
                display: flex;
                position: relative;
        }
        :global(.draggable-hovering-left *) {
                pointer-events: none;
        }
        .side {
                width: 1rem;
                height: 100%;
                margin: auto;
        }
        .right-side {
                pointer-events: all;
        }

        .draggable-hovering-right .right-side {
                background-color: red;
        }
        .draggable-hovering-left {
                &::before {
                        position: absolute;
                        left: -1rem;
                        content: "";
                        background-color: red;
                        width: 1rem;
                        height: 100%;
                }
        }
</style>
