<script>
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
                Column,
                Tag,
                HeaderUtilities,
                HeaderGlobalAction,
        } from "carbon-components-svelte";
        import {
                ContentView,
                Logout,
                Save,
                SettingsAdjust,
                UserAvatarFilledAlt,
                WatsonHealthStackedScrolling_1,
                WatsonHealthStackedScrolling_2,
        } from "carbon-icons-svelte";
        import { globalState } from "$lib/state.js"
    import { get } from "svelte/store";
        
        let isSideNavOpen = false;
</script>

<Header company="Kocia Kuchnia" platformName="SLCMS" bind:isSideNavOpen>
        <svelte:fragment slot="skip-to-content">
                <SkipToContent />
        </svelte:fragment>

        <HeaderUtilities>
                <HeaderGlobalAction
                        type="submit"
                        form="update-form"
                        iconDescription="Save"
                        tooltipAlignment="start"
                        icon={Save}
                />
                <HeaderGlobalAction
                        iconDescription="Preview"
                        icon={ContentView}
                />
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

<Content>
        <slot />
</Content>
