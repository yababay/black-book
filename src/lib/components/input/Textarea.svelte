<script lang="ts">

    import { idByName, descrByName } from "./util.js";

    interface Props {
        name: string;
        value?: string;
        placeholder?: string;
        rows?: number;
        maxlength?: number;
        id?: string;
        descr?: string;
        disabled?: boolean;
    }

    let {
        name,
        value = '',
        placeholder = '',
        rows = 3,
        maxlength = 50000,
        id = idByName(name),
        descr = descrByName(name),
        disabled = false
    }: Props = $props();

</script>

<textarea class="form-control w-100 h-100" {rows} {name}  {placeholder} {maxlength} {disabled} {id} aria-describedby={descr}>{value}</textarea>
