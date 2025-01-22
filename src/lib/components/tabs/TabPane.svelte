<script lang="ts">
    interface Props {
        id: string;
        active: boolean;
        children?: import('svelte').Snippet;
    }

    let { id, active, children }: Props = $props();
</script>

<div class="tab-pane fade h-100" {id} role="tabpanel" aria-labelledby="home-tab" tabindex="0" class:active={active} class:show={active}>
    {#if children}{@render children()}{:else}
        <div class="alert alert-secondary w-100 text-center" role="alert">
            Панель {id}.
        </div>
    {/if}
</div>
