<script lang="ts">

    import { idByName, descrByName } from "./util.js";

    interface Props {
        label?: string;
        name: string;
        value?: string;
        checked?: boolean;
        placeholder?: string;
        id?: string;
        descr?: string;
        disabled?: boolean;
    }

    let {
        label = '',
        name,
        value = 'on',
        checked = false,
        placeholder = '',
        id = idByName(name),
        descr = descrByName(name),
        disabled = false
    }: Props = $props();

</script>

<div class="form-check">
    {#if checked}
        <input class="form-check-input" type="checkbox" {id} {name} {value} {disabled} checked>
    {:else}
        <input class="form-check-input" type="checkbox" {id} {name} {value} {disabled}>
    {/if}
    {#if label || placeholder}
        <label class="form-check-label" for={id} id={descr}>
	    {label || placeholder}
	</label>
    {/if}
</div>
    
