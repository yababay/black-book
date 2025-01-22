<script lang="ts">

    import type { MenuItems } from '../menu/types.js'
    import WithHeader from './WithHeader.svelte'
    import Menu from '../menu/index.svelte'

    interface Props {
        items?: MenuItems | undefined;
        brand?: string | undefined;
        icon?: string | undefined;
        title?: string;
        children?: import('svelte').Snippet;
    }

    let {
        items = undefined,
        brand = undefined,
        icon = undefined,
        title = '',
        children
    }: Props = $props();

</script>

<WithHeader>
    {#snippet header()}
        <Menu {items} {brand} {icon} />
    {/snippet}
    {@render children?.()}
</WithHeader>

<svelte:head>
    {#if title}
        <title>{title}</title>
    {/if}
</svelte:head>
