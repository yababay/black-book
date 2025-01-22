import { saveTopic } from '$lib/server/connection.js'
import { TOPICS_MENU, type Topic, type TOPIC_TYPE } from '$lib/types'

const topics = Reflect.ownKeys(TOPICS_MENU) as TOPIC_TYPE[]

export const load = () => ({ failure: false })

export const actions = {
    default: async ({request}) => {
        const data = await request.formData()
        const body = data.get('body')?.toString()
        const topicRaw = data.get('topic')?.toString()
        const source = data.get('source')?.toString()
        if(!(typeof body === 'string' && body.trim())) return {failure: 'Сообщение должно содержать текст ненулевой длины.'}
        if(!(typeof topicRaw === 'string' && topics.includes(topicRaw as TOPIC_TYPE))) return {failure: 'Топик сообщения указан неправильно.'}
        const topic = topicRaw as TOPIC_TYPE
        const props: Topic = { body, topic }
        if(typeof source === 'string' && source.trim()) props.source = source
        await saveTopic(props)
        return { failure: false }
    }
}
