<script lang="ts">

    import './fieldset.scss'
    import Input from './Input.svelte'
    import Field from './Field.svelte'
    import Textarea from './Textarea.svelte'
    //import Tags from './tags/index.svelte'
    //import { getTitle } from '$lib/types'
    //import { page } from '$app/stores'
    //import { derived } from 'svelte/store';

    export let 
    rows: number = 3, 
    message: string = '', 
    notes: string = '', 
    //tags: string[] | null = [],
    back: string = '1', 
    formaction = '',
    grab: boolean = false,
    label: string = 'Сохранить'

    const title = 'hz' //derived(page, $page => {
        //const { url } = $page
        //const { pathname } = url
        //const arr = /\/(\w+).*/.exec(pathname)
        //if(!arr || !arr[1]) throw 'bad url'
        //return getTitle(arr[1])        
    //})

    const width = 3

</script>

<fieldset>
    <input name="back" type="hidden" value={back}/>
    <legend>Коллекция «Дневники»</legend>
    <section class="d-flex flex-column justify-content-between align-items-center m-0 h-100">
        <slot />
        {#if rows}
            <Field label="Описание:" {width} top={true}>
                <Textarea {rows} value={message || '\n\n[via](https://)'} {grab}/>
            </Field>
        {/if}
        <!-- Tags {width} url="/api/tags" tags={tags || []} / -->
        <Field label="Примечания:" {width}>
            <Input name="notes" value={notes}/>
        </Field>
        <div class="text-end mb-0 me-3 w-100">
            <div class="form-check publish-wrapper me-3">
                <input class="form-check-input" type="checkbox" id="publish" name="publish">
                <label class="form-check-label" for="publish">
                  Опубликовать
                </label>
            </div>
            <button class="btn btn-primary" type="submit" {formaction}>{label}</button>
        </div>
    </section>
</fieldset>

<style lang="scss">
    .publish-wrapper {
        display: inline-block;
    }
</style>
