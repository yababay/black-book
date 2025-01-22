<script lang="ts">

    import Wrapper from './Wrapper.svelte'
    import Input from '../Input.svelte'

    interface Props {
        name: string;
        label?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        name,
        label = '',
        value = '',
        placeholder = '',
        disabled = false,
        children
    }: Props = $props();

</script>

<Wrapper {label} {name}>
    {#snippet input()}
        <Input {value} {name} {placeholder} {disabled} />
    {/snippet}
    {@render children?.()}
</Wrapper>

