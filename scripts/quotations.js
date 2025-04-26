import { readFileSync } from 'fs'
import { createClient } from 'redis'

const raw = readFileSync('backup/quotations.json')

const PROJECT_PREFIX = 'black-book'
const TOPIC_COUNTER_KEY = `${PROJECT_PREFIX}:counter`
const TOPIC_COUNTER_START_VALUE = 1000
const QUEUE_PREFIX = `${PROJECT_PREFIX}:queue`

const url = `redis://localhost:6377`
const client = createClient({url})

const arr = JSON.parse(raw)

let isConnected = false

export const checkConnection = async () => {
    if(isConnected) return
    await client.connect()
    isConnected = true
}

const nextTopicId = async () => {
    const exists = await client.exists(TOPIC_COUNTER_KEY)
    if(!exists) await client.set(TOPIC_COUNTER_KEY, TOPIC_COUNTER_START_VALUE)
    return +(await client.incr(TOPIC_COUNTER_KEY)) 
}

const getTopicKey = async (suffix, id) => {
    if(!id) id = await nextTopicId()
    return `${PROJECT_PREFIX}:topic:${suffix}:${id}`
}

const getQueueKey = (suffix) => {
    return `${QUEUE_PREFIX}:${suffix}`
}

const saveTopic = async (message) => {
    const { topic, body, source } = message
    //console.log(source)
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

(async () => {
    await checkConnection()
    await client.del('black-book:queue:quotation')
    const keys = await client.keys('black-book:topic:quotation:*')
    for(const k of keys) await client.del(k)
    console.log(keys.length + 1, 'are deleted' )
    for(const m of arr) await saveTopic(m)
    console.log(arr.length, 'are imported' )
    await client.save()
    await client.quit()
})()
