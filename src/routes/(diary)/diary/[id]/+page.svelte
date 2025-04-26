<script lang="ts">
    import Field from '$lib/components/editor/Field.svelte'
    import Fieldset from '$lib/components/editor/Fieldset.svelte'
    import Input from '$lib/components/editor/Input.svelte'

    export let data: {person: {firstname: string, lastname: string, birthday: string, key: string}, 
        note: {text: string, date: string, id: string}}
    const { person, note } = data
    const { firstname, lastname, birthday, key } = person
    const { text, date, id } = note
    const author = `${firstname} ${lastname} (${birthday})`
    const source = `https://corpus.prozhito.org/note/${id}`
    const message = `${text}\n\n${
        new Date(date).toLocaleDateString()
        .replace('.01.', ' января ')
        .replace('.02.', ' февраля ')
        .replace('.03.', ' марта ')
        .replace('.04.', ' апреля ')
        .replace('.05.', ' мая ')
        .replace('.06.', ' июня ')
        .replace('.07.', ' июля ')
        .replace('.08.', ' августа ')
        .replace('.09.', ' сентября ')
        .replace('.10.', ' октября ')
        .replace('.11.', ' ноября ')
        .replace('.12.', ' декабря ')
    } г.`
</script>

<Fieldset rows={0} message="" notes="" back="1" formaction="" grab={false} label="Продолжить">

    <input type="hidden" name="collection" value="quotation">
    <input type="hidden" name="person" value={key}>

    <Field label="Автор:">
        <Input name="author" value={author} save={true} />
    </Field>

    <Field label="Сообщение:" top={true}>
        <textarea class="form-control" rows={18} name="message" value={message} placeholder="" maxlength="4096"></textarea>
    </Field>

    <Field label="Источник:">
        <Input name="source" value={source} save={true} />
    </Field>

    <Field label="Направление:">
        <div class="d-flex justify-content-between w-100">
            <div class="d-flex">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="direction" value="stay" id="direction-stay" checked> 
                    <label class="form-check-label" for="direction-stay">
                        остаться
                    </label>
                </div>
                <div class="form-check ms-3">
                    <input class="form-check-input" type="radio" name="direction" value="back" id="direction-back">
                    <label class="form-check-label" for="direction-back">
                        назад
                    </label>
                </div>
                <div class="form-check ms-3">
                    <input class="form-check-input" type="radio" name="direction" value="forward" id="direction-forward">
                    <label class="form-check-label" for="direction-forward">
                        вперед
                    </label>
                </div>
            </div>
            <div class="d-flex">
                <div class="form-check me-3">
                    <input class="form-check-input" type="checkbox" name="hide" id="hide">
                    <label class="form-check-label" for="hide">
                        закрыть
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="omit" id="omit">
                    <label class="form-check-label" for="omit">
                        не сохранять
                    </label>
                </div>
            </div>
        </div>
    </Field>
</Fieldset>
