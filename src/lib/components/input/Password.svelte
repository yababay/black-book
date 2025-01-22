<script lang="ts">

	import { idByName, descrByName } from "./util.js";

	interface Props {
		name: string;
		value?: string;
		placeholder?: string;
		id?: string;
		descr?: string;
		disabled?: boolean;
	}

	let {
		name,
		value = '',
		placeholder = 'пароль пользователя',
		id = idByName(name),
		descr = descrByName(name),
		disabled = false
	}: Props = $props();

</script>

<input
	type="password"
	class="form-control"
	{name} {value} {placeholder} {disabled} {id}
	aria-label={placeholder}
	aria-describedby={descr}
>

