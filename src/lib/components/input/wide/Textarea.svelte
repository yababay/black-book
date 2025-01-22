<script lang="ts">

    import Wrapper from './Wrapper.svelte'
    import Textarea from '../Textarea.svelte'

    interface Props {
        name: string;
        label?: string;
        value?: string;
        placeholder?: string;
        rows?: number;
        maxlength?: number;
        disabled?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        name,
        label = '',
        value = '',
        placeholder = '',
        rows = 3,
        maxlength = 50000,
        disabled = false,
        children
    }: Props = $props();


</script>

<Wrapper {label} {name}>
    {#snippet input()}
        <Textarea {value} {name} {placeholder} {disabled} {rows} {maxlength} />
    {/snippet}
    {@render children?.()}
</Wrapper>
