<script lang="ts">
    import type { Booleanish } from "svelte/elements";
    interface Props {
        target: string;
        label: string;
        selected?: Booleanish;
        active: boolean;
    }

    let {
        target,
        label,
        selected = 'false',
        active
    }: Props = $props();
</script>

<li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" class:active={active}
    data-bs-target={`#${target}`} type="button" role="tab"
    aria-controls={target} aria-selected={selected}>{label}</button>
</li>
