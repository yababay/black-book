<script lang="ts">
    interface Props {
        title?: string;
        children?: import('svelte').Snippet;
    }

    let { title = '', children }: Props = $props();
</script>

<div class="bare-layout">
    {@render children?.()}
</div>

<style lang="scss">
    .bare-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

<svelte:head>
    {#if title}
        <title>{title}</title>
    {/if}
</svelte:head>
