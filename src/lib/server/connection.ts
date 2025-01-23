import { TOPIC_KEYS, PROJECT_PREFIX, QUEUE_PREFIX, TOPIC_COUNTER_KEY, TOPIC_COUNTER_START_VALUE, type Message, type Topic, type TOPIC_TYPE } from '$lib/types';
import { createClient } from 'redis';

const client = createClient()

let isConnected = false

const checkConnection = async () => {
    if(isConnected) return
    await client.connect()
    isConnected = true
}

export const nextTopicId = async () => {
    await checkConnection()
    const exists = await client.exists(TOPIC_COUNTER_KEY)
    if(!exists) await client.set(TOPIC_COUNTER_KEY, TOPIC_COUNTER_START_VALUE)
    return +(await client.incr(TOPIC_COUNTER_KEY)) 
}

export const getTopicKey = async (suffix: TOPIC_TYPE, id?: number) => {
    if(!id) id = await nextTopicId()
    return `${PROJECT_PREFIX}:topic:${suffix}:${id}`
}

export const getQueueKey = (suffix: TOPIC_TYPE) => {
    return `${QUEUE_PREFIX}:${suffix}`
}

export const removeFromQueue = async (suffix: TOPIC_TYPE, id: number | string) => {
    const key = getQueueKey(suffix)
    let count = Number.MAX_SAFE_INTEGER
    while(count) {
        count = await client.lRem(key, 1, `${id}`)
    }
}

export const removeFromQueues = async (id: number | string) => {
    for(const suffix of TOPIC_KEYS) await removeFromQueue(suffix, id)
}

export const saveTopic = async (message: Topic) => {
    const { topic, body, source } = message
    if(!(topic && typeof body === 'string' && body.trim())) throw 'no topic or body'
    const key = await getTopicKey(topic, message.id)
    const id = (/.*\:(\d+)$/.exec(key) || [])[1]
    if(typeof id !== 'string') throw 'no id'
    await client.hSet(key, 'body', body)
    if(source) await client.hSet(key, 'source', source)
    const queue = getQueueKey(topic)
    await client.lPush(queue, id)
    return +id
}

export const getTopic = async (topic: TOPIC_TYPE, id: number): Promise<Message> => {
    const key = await getTopicKey(topic, id)
    const {body, source} = await client.hGetAll(key)
    let props: Message = { id, topic, body }
    if(source && source.trim()) props = {...props, source}
    return props
}

export const deleteTopic = async (topic: TOPIC_TYPE, id: number) => {
    const key = await getTopicKey(topic, id)
    await client.del(key)
    return !(await client.exists(key))
}
