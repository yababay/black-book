<script lang="ts">

    import Slots from '../Slots.svelte'
    import Fieldset from '../Fieldset.svelte'
    import Field from '../Field.svelte'
    import Input from '../Input.svelte'
    import { derived } from 'svelte/store';
    import Textarea from '../Textarea.svelte';
    import { collection } from '$lib'
    import type { WritingCreateAttributes } from '$lib/types/attributes';

    const isPoetry = derived(collection, $collection => {
        return $collection === 'poetry'
    })

    export let values: WritingCreateAttributes

    const { message, notes, tags, author, source, back } = values

</script>

<Slots>
    <div slot="left" class="w-100 h-100 d-flex flex-direction-column align-items-end p-3">
        <Textarea value={message} caption={false}/>
    </div>
    <Fieldset slot="right" rows={0} {message} {notes} {tags} {back} >
        <Field label="Коллекция:">
            <div class="w-100">
                <div class="form-check d-inline-block ms-2">
                    <input class="form-check-input" type="radio" name="collection" id="collection-photo" value="quotation" checked={!$isPoetry} />
                    <label class="form-check-label" for="collection-photo">цитата</label>
                </div>
                <div class="form-check d-inline-block ms-5">
                    <input class="form-check-input" type="radio" name="collection" id="collection-picture" value="poetry" checked={$isPoetry} />
                    <label class="form-check-label" for="collection-picture">стихи</label>
                </div>
            </div>
        </Field>
        <Field label="Автор:">
            <Input name="author" value={author} save={true} />
        </Field>
        <Field label="Источник:">
            <Input name="source" value={source} save={true} />
        </Field>
    </Fieldset>
</Slots>
