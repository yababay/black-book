<script lang="ts">
    import { Topic } from '$lib/types';
    import Editor from '../../Editor.svelte'
    export let data: Topic
</script>

<Editor {data} skip={true}/>
