<script lang="ts">
    import { onMount } from "svelte";
    import Field from "./Field.svelte";
    import Input from "./Input.svelte";

    export let
    name: string = 'message',
    placeholder: string = 'введите сообщение, можно использовать markdown',
    value: string = '',
    caption: boolean = true,
    rows: number = 3,
    grab: boolean = false

    const maxlength = caption ? 1024 : 4096
    const GRAB_TELEGRAM = 'grab-telegram'

    let area: HTMLTextAreaElement, modal: HTMLElement

    onMount(() => {
        modal.addEventListener('hidden.bs.modal', async () => {
            const input = modal.querySelector('input')
            if(!(input && input instanceof HTMLInputElement)) throw 'no input'
            const { value } = input
            if(!value.startsWith('https://t.me')) return
            console.log(input.value)
            area.value = await fetch(`/api/grab?url=${encodeURIComponent(value)}`).then(res => res.text())
            input.value = ''
        })
    })

    const saveArea = () => localStorage.setItem('area-value', area.value)
    const restoreArea = () => area.value = localStorage.getItem('area-value') || ''

</script>

<div class="modal fade" id={GRAB_TELEGRAM} tabindex="-1" aria-labelledby={GRAB_TELEGRAM} aria-hidden="true" bind:this={modal}>
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">Импортировать из Телеграм</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <Field label="URL поста:">
                <Input name="telegram-url"/>
            </Field>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Импортировать</button>
        </div>
        </div>
    </div>
</div>

<div class="w-100 d-flex">
    <textarea class="form-control" {rows} {name} {value} {placeholder} {maxlength} class:full-height={!caption} bind:this={area}></textarea>
    {#if grab}
        <div class="btn-group-vertical me-1 ms-2" role="group" aria-label="tools">
            <button class="btn btn-outline-secondary" title="Из Telegram"  data-bs-toggle="modal" data-bs-target={`#${GRAB_TELEGRAM}`} type="button"><i class="bi bi-telegram"></i></button>
            <button class="btn btn-outline-secondary" title="Сохранить" type="button" on:click={saveArea}><i class="bi bi-box-arrow-in-down"></i></button>
            <button class="btn btn-outline-secondary" title="Восстановить" type="button" on:click={restoreArea}><i class="bi bi-box-arrow-in-up"></i></button>
        </div>
    {/if}
</div>

<style lang="scss">
    .full-height {
        height: calc(100vh - 4.5rem)
    }
</style>
