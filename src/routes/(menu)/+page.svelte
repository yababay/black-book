<script lang="ts">
    import Editor from './Editor.svelte'
    type Prev = { prev: string, topic: string }
    export let data: Prev, form: Prev
    const { prev, topic } = ( form || data )
</script>

<Editor {prev} {topic} />