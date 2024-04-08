<script>
        // @ts-nocheck

        import "carbon-components-svelte/css/white.css";
        import {
                Header,
                SideNav,
                SideNavItems,
                SideNavLink,
                SideNavDivider,
                SkipToContent,
                Content,
                HeaderPanelLink,
                Tag,
                HeaderUtilities,
                HeaderGlobalAction,
                HeaderAction,
                HeaderPanelLinks,
                HeaderPanelDivider,
        } from "carbon-components-svelte";
        import {
                ContentView,
                Save,
                WatsonHealthStackedScrolling_1,
                WatsonHealthStackedScrolling_2,
                Add,
        } from "carbon-icons-svelte";
        import {
                elementModalOpen,
                elementModalType,
        } from "$lib/state.js";
        import ElementModal from "$lib/ElementModal.svelte";

        let isSideNavOpen = false;
        export let data;
</script>

<Header company="Kocia Kuchnia" platformName="SLCMS" bind:isSideNavOpen>
        <svelte:fragment slot="skip-to-content">
                <SkipToContent />
        </svelte:fragment>

        <HeaderUtilities>
                <HeaderGlobalAction
                        iconDescription="Preview"
                        icon={ContentView}
                />
                <HeaderGlobalAction
                        type="submit"
                        form="update-form"
                        iconDescription="Save"
                        tooltipAlignment="start"
                        icon={Save}
                />
                <HeaderAction icon={Add}>
                        <HeaderPanelLinks>
                                <HeaderPanelDivider
                                        >Add element</HeaderPanelDivider
                                >
                                <HeaderPanelLink
                                        on:click={() => {
                                                elementModalOpen.set(true);
                                                elementModalType.set(
                                                        "short_text",
                                                );
                                        }}>Short Text</HeaderPanelLink
                                >
                                <HeaderPanelLink
                                        on:click={() => {
                                                elementModalOpen.set(true);
                                                elementModalType.set(
                                                        "composite",
                                                );
                                        }}>Composite</HeaderPanelLink
                                >
                        </HeaderPanelLinks>
                </HeaderAction>
        </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
                <Tag icon={WatsonHealthStackedScrolling_1} size="sm">Pages</Tag>
                {#each data.pages as page}
                        <SideNavLink text={page.name} href = {`/pages/${page.name}`}/>
                {/each}
                <!-- <SideNavMenu text="Menu"> 
                         <SideNavMenuItem href="/" text="Link 1" /> 
                         <SideNavMenuItem href="/" text="Link 2" /> 
                         <SideNavMenuItem href="/" text="Link 3" /> 
                </SideNavMenu> -->
                <SideNavDivider />
                <Tag icon={WatsonHealthStackedScrolling_2} size="sm">
                        Collections</Tag
                >
                <SideNavLink text="Blog Posts" />
                <SideNavLink text="Products" />
        </SideNavItems>
</SideNav>

<ElementModal />

<Content>
        <slot />
</Content>
