<script lang="ts">

    import Wrapper from './Wrapper.svelte'
    import Range from '../Range.svelte'

    interface Props {
        name: string;
        label?: string;
        value?: number;
        min?: number;
        max?: number;
        disabled?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        name,
        label = '',
        value = 0,
        min = 0,
        max = 100,
        disabled = false,
        children
    }: Props = $props();


</script>

<Wrapper {label} {name}>
    {#snippet input()}
        <Range {value} {min} {max} {name} {disabled} />
    {/snippet}
    {@render children?.()}
</Wrapper>
