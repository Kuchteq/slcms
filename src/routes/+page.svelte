<script>
        import Blender from "$lib/blender.svelte";
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
                TextInput,
                HeaderPanelDivider,
                Loading,
        } from "carbon-components-svelte";
        let fetchJson = fetch("http://localhost:8000/cms/landing_page").then(
                (res) => res.json(),
        );
</script>

<Grid>
        <Row>
                <Column noGutter>
                        <h1>Landing Page</h1>
                        <HeaderPanelDivider />
                </Column>
        </Row>
        {#await fetchJson}
                <Loading/>
        {:then result}
                <Blender {result} />
        {/await}
</Grid>
