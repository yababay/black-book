<script lang="ts">
    import Fieldset from './Fieldset.svelte'
    interface Props {
        legend: string;
        children?: import('svelte').Snippet;
    }

    let { legend, children }: Props = $props();
</script>

<Fieldset {legend}>
    <form method="post" class="w-100">
        {@render children?.()}
    </form>
</Fieldset>

<style lang="scss">
    form {
        max-width: 80ch;
        padding-inline: 1.5rem;
        padding-block: .7rem;
    }
</style>
