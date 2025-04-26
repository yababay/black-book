<script lang="ts">
    import { onMount } from 'svelte'
    import { writable } from 'svelte/store'
    import Field from '../Field.svelte'
    import TagBadge from './TagBadge.svelte'
    import Autocomplete from './autocomplete.js'

    export let 
    width: number = 1,
    tags: string[] = [],
    url: string = '/tags.json',
    separator: string = ','

    const reactiveTags = writable(Array.isArray(tags) && tags.length && tags.sort() || [])

    let badges: HTMLParagraphElement, input: HTMLInputElement, hidden: HTMLInputElement
    
    const tagsListener = (tag: string, del: boolean = false) => {
        const current = $reactiveTags
        const update = del ? current.filter(t => t !== tag) : [...new Set([...current, tag])].sort()
        $reactiveTags = update
    }

    const updateTags = () =>  {
        tagsListener(input.value.trim())
        input.value = ''
    }

    function tagUp(e: KeyboardEvent){
        if(e.code !== 'ArrowUp') return
        updateTags()
    }

    onMount(() => {
        const settings = {
            onSelectItem: () => {
                updateTags()
            }
        }
        Reflect.construct(Autocomplete, [input, settings])
        reactiveTags.subscribe(tags => {
            badges.innerHTML = ''
            tags.map(text => new TagBadge({target: badges, props: {tagsListener, text}}))
            const update = tags.join(separator)
            hidden.value = update
            if(update.trim()) localStorage.setItem(`previous-tags`, update)
        })
    })

    const onclick = (e: Event) => {
        e.preventDefault()
        const prev = localStorage.getItem(`previous-tags`)
        if(!prev) return
        const tags = prev.split(',')
        if(Array.isArray(tags) && tags.length) $reactiveTags = tags
    }
</script>

<div class="w-100 d-flex flex-column justify-content-end wrapper">
    <p bind:this={badges} class="text-end w-100"></p>
    <input name="tags" type="hidden" bind:this={hidden}>

    <Field id="tags" label="Тэги" {width}>
        <div class="w-100 d-flex">
            <input
                data-server={url}
                type="text"
                class="form-control w-100"
                placeholder="выберите или введите тэги"
                bind:this={input}
                on:keydown={tagUp}
            >
            <button class="btn btn-outline-secondary ms-3" title="Восстановить" on:click={onclick}><i class="bi bi-clipboard-check"></i></button>
        </div>
    </Field>
</div>

<style lang="scss">
    .wrapper {
        height: 80px;
    }
</style>