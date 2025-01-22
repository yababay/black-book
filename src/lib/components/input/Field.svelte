<script lang="ts">
    interface Props {
        name?: string;
        label?: string;
        placeholder?: string;
        width?: number;
        disabled?: boolean;
        value?: string | number;
        type?: string;
        children?: import('svelte').Snippet;
    }

    let {
        name = '',
        label = '',
        placeholder = '',
        width = 25,
        disabled = false,
        value = '',
        type = 'text',
        children
    }: Props = $props();

    const id = `id-for-${name}`
</script>

<div class="input-group mb-3">
    <span class="input-group-text d-inline-block text-end" class:w-25={width <= 25}  class:w-50={width > 25 && width <= 50} class:w-75={width > 50} {id}>
        {label}
    </span>
    {#if children}{@render children()}{:else}
        <input
            {type}
            {placeholder}
            {value}
            {name}
            aria-label={placeholder}
            aria-describedby={id}
            disabled={disabled}
            class="form-control"
        >
    {/if}
</div>
