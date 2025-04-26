<script lang="ts">

    import Slots from '../Slots.svelte'
    import Fieldset from '../Fieldset.svelte'
    import type { MediaCreateAttributes } from '$lib/types/attributes'

    export let values: MediaCreateAttributes, formaction = '?/'

    const { link, back, message, notes, tags } = values

    let src = `https://www.youtube.com/embed/${link}`

</script>

<Slots>
    <div slot="left" class="w-100 h-100 d-flex flex-direction-column justify-content-center align-items-center">
        <iframe width="426" height="240" {src} title={message} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>        
        <input name="link" type="hidden" value={link}/>
    </div>
    <Fieldset slot="right" rows={10} {message} {notes} {tags} {back} {formaction} />
</Slots>
