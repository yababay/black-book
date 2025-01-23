import { TOPIC_KEYS, type Topic, type TOPIC_TYPE } from "$lib/types"
import { saveTopic as saveTopicInDb } from "./connection"

export const saveTopis = async (data: FormData, id?: number) => {
    const body = data.get('body')?.toString()
    const topicRaw = data.get('topic')?.toString()
    const source = data.get('source')?.toString()
    if(!(typeof body === 'string' && body.trim())) return {failure: 'Сообщение должно содержать текст ненулевой длины.'}
    if(!(typeof topicRaw === 'string' && TOPIC_KEYS.includes(topicRaw as TOPIC_TYPE))) return {failure: 'Топик сообщения указан неправильно.'}
    const topic = topicRaw as TOPIC_TYPE
    const props: Topic = { body, topic, id }
    if(typeof source === 'string' && source.trim()) props.source = source
    await saveTopicInDb(props)
    return props
}
