<script lang="ts">

    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { idByName } from "./util.js";

    interface Props {
        min?: number;
        max?: number;
        name: string;
        id?: string;
        disabled?: boolean;
        value?: number;
    }

    let {
        min = 0,
        max = 100,
        name,
        id = idByName(name),
        disabled = false,
        value = 0
    }: Props = $props();

    let input: HTMLInputElement = $state()
    let badge: string = $state('' + value)

</script>

<div class="d-flex gap-1 justyfy-content-between">
	<input type="range" class="form-range" 
	{min} {max} {id} {name} {value} {disabled}
	bind:this={input} onchange={function() {badge = this.value}}>
	<span class="badge text-bg-secondary" bind:textContent={badge} contenteditable="true"></span>
</div>

