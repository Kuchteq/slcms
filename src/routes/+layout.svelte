<script>
        // @ts-nocheck

        import "carbon-components-svelte/css/white.css";
        import {
                Header,
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
                HeaderPanelLink,
                Column,
                Tag,
                HeaderUtilities,
                HeaderGlobalAction,
                OverflowMenuItem,
                OverflowMenu,
                Modal,
                Select,
                TextInput,
                SelectItem,
                HeaderAction,
                HeaderPanelLinks,
                HeaderPanelDivider,
        } from "carbon-components-svelte";
        import {
                ContentView,
                Logout,
                Save,
                SettingsAdjust,
                UserAvatarFilledAlt,
                WatsonHealthStackedScrolling_1,
                WatsonHealthStackedScrolling_2,
                Settings,
                AssetConfirm,
                Add,
        } from "carbon-icons-svelte";
        import {
                globalState,
                moveMode,
                elementModalOpen,
                elementModalType,
        } from "$lib/state.js";
        import { get } from "svelte/store";
        import ElementModal from "$lib/ElementModal.svelte";

        let isSideNavOpen = false;
        let open = true;
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
                <SideNavLink text="Landing Page" />
                <SideNavLink text="About Us" />
                <SideNavLink text="Recipes" />
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
