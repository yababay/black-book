<script lang="ts">

    import { onMount } from 'svelte'
    import { derived } from 'svelte/store'
    import Slots from '../Slots.svelte'
    import Fieldset from '../Fieldset.svelte'
    import Field from '../Field.svelte'
    import { blob, uploaded } from './store'
    import { collection } from '$lib'
    import type { MediaCreateAttributes } from '$lib/types/attributes'

    const isPicture = derived(collection, $collection => {
        return $collection === 'picture'
    })

    export let values: MediaCreateAttributes, formaction='?/'

    const { link, back, message, notes, tags } = values

    onMount(() => {
        document.addEventListener('paste', async (e) => {
            const clipboardItems = typeof navigator?.clipboard?.read === 'function' ? await navigator.clipboard.read() : (e.clipboardData ? e.clipboardData.files : null);
            if(!clipboardItems) return
            const [ clipboardItem ] = clipboardItems
            if(!(clipboardItem instanceof File)) return
            const { type } = clipboardItem
            if (!type.startsWith('image/')) return
            $blob = clipboardItem
            e.preventDefault();
        })
    })

</script>

<Slots>
    <div slot="left" class="w-100 h-100 d-flex flex-direction-column justify-content-center align-items-center">
        {#if link}
            <img src={link} alt="preview" class="w-100 p-3">
            <input name="link" type="hidden" value={link}/>
        {:else}
            {#await $uploaded()}
                <div class="progress w-75" role="progressbar" aria-label="Animated striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated w-100"></div>
                </div>
            {:then src} 
                <img {src} alt="preview" class="w-100 p-3">
                <input name="link" type="hidden" value={src}/>
            {/await}
        {/if}
    </div>
    <Fieldset slot="right" rows={10} {message} {notes} {tags} {back} {formaction} grab={true}>
        <Field label="Коллекция:">
            <div class="w-100">
                <div class="form-check d-inline-block ms-2">
                    <input class="form-check-input" type="radio" name="collection" id="collection-photo" value="photo" checked={!$isPicture} />
                    <label class="form-check-label" for="collection-photo">фото</label>
                </div>
                <div class="form-check d-inline-block ms-5">
                    <input class="form-check-input" type="radio" name="collection" id="collection-picture" value="picture" checked={$isPicture} />
                    <label class="form-check-label" for="collection-picture">картинка</label>
                </div>
            </div>
        </Field>
    </Fieldset>
</Slots>
