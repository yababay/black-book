<script lang="ts">
    import Editor from './Editor.svelte'
    type Prev = { prev: string }
    export let data: Prev, form: Prev
    const { prev } = ( form || data )
</script>

<Editor {prev} />