<script lang="ts">
    interface Props {
        title?: string;
        header?: import('svelte').Snippet;
        children?: import('svelte').Snippet;
    }

    let { title = '', header, children }: Props = $props();
</script>

<div class="layout-with-header">
    
    <header>
        {@render header?.()}
    </header>

    <main>
        {@render children?.()}
    </main>

</div>

<style lang="scss">

    @use './styles/settings' as *;
    
    .layout-with-header {
        min-height: 100vh;
        display: grid;
        grid-template:
            "header" $header-height
            "main" auto;
        header {
            grid-area: header;
        }
            
        main {
            grid-area: main;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>

<svelte:head>
    {#if title}
        <title>{title}</title>
    {/if}
</svelte:head>
