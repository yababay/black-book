<script lang="ts">
    export let
        name: string = '',
        label: string = '',
        placeholder: string = '',
        width: number = 25,
        disabled = false,
        value: string | number = '',
        type = 'text'

    const id = `id-for-${name}`
</script>

<div class="input-group mb-3">
    <span class="input-group-text d-inline-block text-end" class:w-25={width <= 25}  class:w-50={width > 25 && width <= 50} class:w-75={width > 50} {id}>
        {label}
    </span>
    <slot>
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
    </slot>
</div>
