<script lang="ts">

    import Wrapper from './Wrapper.svelte'
    import Password from '../Password.svelte'

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
        placeholder = 'пароль пользователя',
        disabled = false,
        children
    }: Props = $props();


</script>

<Wrapper {label} {name}>
    {#snippet input()}
        <Password {value} {name} {placeholder} {disabled} />
    {/snippet}
    {@render children?.()}
</Wrapper>
