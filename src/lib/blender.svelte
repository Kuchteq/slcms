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
        } from "carbon-components-svelte";
        import { globalState } from "$lib/state.js";

        // import  TextInput from "carbon-components-svelte/src/TextInput/TextInput.svelte"
    import { CopyFile, Cut } from "carbon-icons-svelte";
        /**
         * @type {any}
         */

        export let result;
        /**
     * @type {any[]}
     */
        export let targets = [];
</script>

<Form
        id="update-form"
        on:submit={(e) => {
                console.log(targets)
                // fetch("http://localhost:8000/cms/landing_page", {
                //         method: "POST",
                //         body: JSON.stringify(result),
                // }).then((res) => console.log(res));
                e.preventDefault();
        }}
>

        {#each result.data as value}
                <Row>
                        <h3>{value.label}</h3>
                </Row>
                <Row>
                        {#each value.data as v, i}
                                <Column noGutterLeft>
                                        <!-- Remember that the targets also have to be BINDED, not just passed as ref-->
                                        <TextInput bind:ref={targets[i]} 
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

<ContextMenu target={targets}  on:open={(e) => console.log(e.detail)}>
  <ContextMenuOption
    indented
    labelText="Copy"
    shortcutText="⌘C"
    icon={CopyFile}
  />
  <ContextMenuOption indented labelText="Cut" shortcutText="⌘X" icon={Cut} />
  <ContextMenuDivider />
  <ContextMenuOption indented labelText="Export as">
    <ContextMenuGroup labelText="Export options">
      <ContextMenuOption id="pdf" labelText="PDF" />
      <ContextMenuOption id="txt" labelText="TXT" />
      <ContextMenuOption id="mp3" labelText="MP3" />
    </ContextMenuGroup>
  </ContextMenuOption>
  <ContextMenuDivider />
  <ContextMenuOption selectable labelText="Remove metadata" />
  <ContextMenuDivider />
  <ContextMenuGroup labelText="Style options">
    <ContextMenuOption id="0" labelText="Font smoothing" selected />
    <ContextMenuOption id="1" labelText="Reduce noise" />
    <ContextMenuOption id="2" labelText="Auto-sharpen" />
  </ContextMenuGroup>
  <ContextMenuDivider />
  <ContextMenuOption indented kind="danger" labelText="Delete" />
</ContextMenu>

