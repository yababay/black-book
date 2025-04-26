<script lang="ts">
    
    export let
    type: string = 'text',
    value: string = '',
    placeholder: string = '',
    name: string,
    save: boolean = false

    const onchange = (e: Event) => {
        if(!save) return
        const { target } = e
        if(!(target instanceof HTMLInputElement)) return
        localStorage.setItem(`previous-${name}`, target.value)
    }

    const onclick = (e: Event) => {
        e.preventDefault()
        if(!save) return
        const prev = localStorage.getItem(`previous-${name}`)
        if(prev) input.value = prev
    }

    let input: HTMLInputElement 

</script>

{#if type === 'hidden'}
    <input {type} {value} {name}>
{:else if type === 'checkbox'}
    <div class="form-check">
        <input class="form-check-input" type="checkbox" {value} {name}>
    </div>
{:else}
    <div class="w-100 d-flex">
        <input  {type} {value} {name} {placeholder} on:change={onchange} class="form-control" bind:this={input}>
        {#if save}
            <button class="btn btn-outline-secondary ms-3" title="Восстановить" on:click={onclick}><i class="bi bi-clipboard-check"></i></button>
        {/if}
    </div>
{/if}
