<script lang="ts">

    import { TOPIC_MENU as items, TOPIC_RECORDS, type TOPIC_TYPE } from '$lib/types';
    import { LayoutWithMenu } from '$lib/components'

    export let data: {topic: string}

    const { topic } = data
    let { title } = topic && TOPIC_RECORDS[topic as TOPIC_TYPE] || { title: 'Новое сообщение' }
    if(topic) title = `Коллекция «${title}»`
    const brand = title

    const journals = { title: 'Мемуары (импорт)', icon: 'journal', href: `/diary` }

</script>

<LayoutWithMenu {title} {brand} items={[...items, journals]} >
    <slot />
</LayoutWithMenu>
