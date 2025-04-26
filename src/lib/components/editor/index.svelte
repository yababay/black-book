<script lang="ts">

    import { emptyMedia, emptyWriting } from '$lib/types'
    import type { Collection } from '$lib/types'
    import type { CreateAttributes, MediaCreateAttributes, WritingCreateAttributes } from '$lib/types/attributes'
    import Picture from '$lib/components/editor/picture/index.svelte'
    import Writing from '$lib/components/editor/writing/index.svelte'
    import Audio from '$lib/components/editor/audio/index.svelte'
    import Youtube from '$lib/components/editor/youtube/index.svelte'
    import Document from '$lib/components/editor/document/index.svelte'

    export let data: { collection: Collection, record?: CreateAttributes, formaction?: string}

    const { collection, record } = data
    const formaction = data.formaction || ''
    const writing = record as WritingCreateAttributes || emptyWriting
    const media = record as MediaCreateAttributes || emptyMedia

</script>

{#if ['picture', 'photo'].includes(collection)}
    <Picture values={media} {formaction} />
{:else if ['quotation', 'poetry'].includes(collection)}
    <Writing values={writing} />
{:else if collection === 'audio'}
    <Audio values={media} />
{:else if collection === 'youtube'}
    <Youtube values={media} {formaction} />
{:else}
    <Document values={media} />
{/if}
