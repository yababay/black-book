import { createClient } from 'redis'

const PROJECT_PREFIX = 'black-book'
const TOPIC_COUNTER_KEY = `${PROJECT_PREFIX}:counter`
const TOPIC_COUNTER_START_VALUE = 1000
const QUEUE_PREFIX = `${PROJECT_PREFIX}:queue`

const url = `redis://localhost:6377`
const client = createClient({url})

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

const getMonth = (mm) => {
    switch(mm.slice(0, 3)){
        case 'янв': return '01' 
        case 'фев': return '02' 
        case 'мар': return '03' 
        case 'апр': return '04' 
        case 'мая': return '05' 
        case 'июн': return '06' 
        case 'июл': return '07' 
        case 'авг': return '08' 
        case 'сен': return '09' 
        case 'окт': return '10' 
        case 'ноя': return '11' 
        case 'дек': return '12' 
        default: return null
    }
}

(async () => {
    await checkConnection()
    //await client.del('black-book:queue:memo')
    const keys = await client.keys('black-book:topic:quotation:*')
    const arr = await client.lRange('black-book:queue:quotation', 0, -1)
    let ok = []
    for(const id of arr) {
        const body = await client.hGet('black-book:topic:quotation:' + id, 'body')
        //console.log(body)
        const ru =  /(\d+)\s+([а-я]+)\s+(\d+)\s+г\.$/.exec(body.trim())
        if(!ru) continue
        let [ _, dd, mm, yyyy ] = ru
        if(+dd < 10) dd = '0' + dd
        const m = getMonth(mm)
        if(!m) continue
        const iso = `${yyyy}-${m}-${dd}`
        const time = new Date(iso).getTime()
        ok.push({id, iso, time})
    }
    ok = ok.sort((a, b) => a.time < b.time ? -1 : 1)
    for(const rec of ok) {
        const { id } = rec
        const keyFrom = 'black-book:topic:quotation:' + id
        const keyTo = 'black-book:topic:memo:' + id
        await client.rename(keyFrom, keyTo)
        await client.lPush('black-book:queue:memo', id)
    }
    console.log('there are', ok.length, 'records with date,', arr.length, 'was')
    //await client.save()
    await client.quit()
})()
