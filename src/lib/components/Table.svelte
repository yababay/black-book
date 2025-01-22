<script lang="ts">
    interface Props {
        columns: string[] | string;
        children?: import('svelte').Snippet;
    }

    let { columns = $bindable(), children }: Props = $props();
    if(typeof columns === 'string') columns = columns.split(/[\ \,]+/)
</script>

<table class="table table-striped w-100">
    <thead>
        <tr>
            {#each columns as title}
                <th class="text-center">{title || ''}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {@render children?.()}
    </tbody>
</table>

<style lang="scss">
    table {
        max-width: 100ch;
    }
</style>