<script lang="ts">
    import Slots from '$lib/components/editor/Slots.svelte'
    import '$lib/styles/diary.scss'

    export let data: {persons: {firstname: string, lastname: string, birthday: string, key: string}[]}

    const { persons } = data

</script>

<Slots>
    <div slot="left" class="w-100 h-100 d-flex flex-column justify-content-between align-items-center">
        <div class="mt-3 btn-group btn-group-sm ms-3" role="group" aria-label="Small button group">
            <a href="/diary" title="Все мемуары" type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-house"></i></a>
        </div>
        <ul>
            {#each persons as {key, firstname, lastname}}
                <li><a href={`/diary/${key}`} rel="external">{`${firstname} ${lastname}`}</a></li>
            {/each}
        </ul>
        <p>&nbsp;</p>
    </div>
    <section class="w-100 h-100 d-flex justify-content-center align-items-center" slot="right">
        <slot />
    </section>
</Slots>

<style lang="scss">
    ul {
        height: 80%;
        overflow-y: auto;
    }
</style>
