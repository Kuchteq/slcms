<script>
        import {
                HeaderNav,
                HeaderNavItem,
                HeaderNavMenu,
                SideNav,
                SideNavItems,
                SideNavMenu,
                SideNavMenuItem,
                SideNavLink,
                SideNavDivider,
                SkipToContent,
                Content,
                Grid,
                Row,
                Column,
                Tag,
                TextInput,
                HeaderPanelDivider,
                Loading,
                Tile,
                ExpandableTile,
                Modal,
                Select,
                SelectItem,
        } from "carbon-components-svelte";
        import {
                elementModalOpen,
                elementModalType,
                elementModalFields,
                addMode,
        } from "$lib/state.js";
        import { get } from "svelte/store";
    import ShortText from "./ElementFields/ShortText.svelte";
    import Composite from "./ElementFields/Composite.svelte";

        let fieldsState = {}
</script>

<Modal
        bind:open={$elementModalOpen}
        modalHeading={`Add ${$elementModalType}`}
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        on:click:button--secondary={() => elementModalOpen.set(false)}
        on:click:button--primary={() => {
                elementModalFields.set(fieldsState);
                elementModalOpen.set(false);
                addMode.set(true);
        }}
        preventCloseOnClickOutside
        on:open
        on:close = {()=>fieldsState = {}}
        on:submit
>
{#if $elementModalType == "short_text"}
        <ShortText bind:fieldsState/>
{:else if $elementModalType == "composite"}
        <Composite bind:fieldsState/>
{/if}
</Modal>
