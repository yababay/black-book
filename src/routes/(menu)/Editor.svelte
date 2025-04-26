<script lang="ts">
    import Form from "$lib/components/Form.svelte"
    import Field from "$lib/components/input/Field.svelte"
    import Textarea from "$lib/components/input/Textarea.svelte"
    import Submit from "$lib/components/Submit.svelte"
    import { TOPIC_KEYS, TOPIC_RECORDS, type TOPIC_TYPE, type Topic } from "$lib/types"

    export let data: Topic = { body: '', source: '' }, prev: string = '', topic: string = ''
    export let skip = false

    const { body, source, id } = data
    if(data.topic) topic = data.topic
    const legend = typeof id === 'number' ? `Сообщение №${id}` : 'Новое сообщение'
    const options: {value: TOPIC_TYPE, title: string}[] = TOPIC_KEYS.map(value => {
        const { title } = TOPIC_RECORDS[value]
        return { value, title }
    })

</script>

<div class="wrap">
    <Form {legend}>
        {#if id}
            <input type="hidden" value={id} name="id">
        {/if}
        <Field label="Коллекция">
            <select class="form-select" aria-label="Список топиков" name="topic">
                {#each options as {value, title} }
                    <option {value} selected={value === topic || value === 'draft'}>{title}</option>
                {/each}
            </select>
        </Field>
        <Textarea name="body" value={body}/>
        <Field label="Источник" name="source"  value={ source || prev }/>
        {#if skip}
            <Submit formaction="?/save">
                <span slot="options" class="w-75 d-inline-block text-start">
                    <button class="btn btn-secondary" type="submit" formaction="?/stop">Закончить</button>
                    <button class="btn btn-secondary" type="submit" formaction="?/skip">Пропустить</button>
                </span>
            </Submit>
        {:else}
            <Submit />
        {/if}
    </Form>
</div>

<style lang="scss">
    .wrap {
        min-height: 75vh;
        min-width: 80ch;
    }
</style>