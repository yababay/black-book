<script lang="ts">

    import Slots from '../Slots.svelte'
    import Fieldset from '../Fieldset.svelte'
    import type { MediaCreateAttributes } from '$lib/types/attributes'

    export let values: MediaCreateAttributes

    const { link, back, message, notes, tags } = values

</script>

<Slots>
    <div slot="left" class="w-100 h-100 d-flex flex-direction-column justify-content-center align-items-center">
        <audio src={link} controls class="w-75">
        <input name="link" type="hidden" value={link}/>
    </div>
    <Fieldset slot="right" rows={10} {message} {notes} {tags} {back} />
</Slots>
