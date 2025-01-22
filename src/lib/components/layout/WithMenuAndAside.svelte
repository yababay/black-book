<script lang="ts">

    import WithMenu from './WithMenu.svelte'
    import WithAside from './WithAside.svelte'
    import type { MenuItems } from '../menu/types.js'

    interface Props {
        items?: MenuItems | undefined;
        brand?: string | undefined;
        icon?: string | undefined;
        title?: string;
        aside?: import('svelte').Snippet;
        children?: import('svelte').Snippet;
    }

    let {
        items = undefined,
        brand = undefined,
        icon = undefined,
        title = '',
        aside,
        children
    }: Props = $props();

</script>

<WithMenu {items} {brand} {icon} {title}>
    <WithAside>
        {@render aside?.()}
        {@render children?.()}
    </WithAside>
</WithMenu>

<svelte:head>
    {#if title}
        <title>{title}</title>
    {/if}
</svelte:head>
