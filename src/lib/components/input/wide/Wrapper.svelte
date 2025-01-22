<script lang="ts">

    import { idByName, descrByName } from "../util.js";


    interface Props {
        name: string;
        label?: string;
        input?: import('svelte').Snippet;
        children?: import('svelte').Snippet;
    }

    let {
        name,
        label = '',
        input,
        children
    }: Props = $props();

    const id = idByName(name)
    const descr = descrByName(name)

</script>

<div class="w-100">
    <label for={id} class="form-label" class:d-none={!(label && label.trim())}>{label}</label>
    {@render input?.()}
    <div class="form-text" id={descr}>
    	{@render children?.()}
    </div>
</div>
