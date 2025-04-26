import { checkConnection, getQueueKey, client, getTopicKey } from '$lib/server/connection'
import { saveTopic } from '$lib/server/routes'
import { Message, TOPIC_TYPE } from '$lib/types'
import { redirect } from '@sveltejs/kit'

const getNext = async(topic: string): Promise<Message> => {
    await checkConnection()
    const queue = getQueueKey(topic  as TOPIC_TYPE)
    const id = await client.lPop(queue)
    if(!id || isNaN(+id)) throw 'bad id'
    const key = await getTopicKey(topic  as TOPIC_TYPE, id)
    const {body, source} = await client.hGetAll(key)
    const data: Message = { id: +id, topic: topic  as TOPIC_TYPE, body: body
        .replace(/(\r\n){2,}/g, '%%')
        .replace(/\n{2,}/g, '%%')
        .replace(/[\r\n]/g, ' ')
        .replaceAll('%%', '\n\n')
     }
    if(source && source.trim()) data.source = source
    return data
}

export const load = async ({params}) => {
    const { topic } = params
    return await getNext(topic)
}

export const actions = {

    skip: async ({params}) => {
        const { topic } = params
        throw redirect(302, `/edit/${topic}`)
    },

    stop: async ({request}) => {
        const data = await request.formData()
        await saveTopic(data)
        throw redirect(302, `/`)
    },

    save: async ({request, params}) => {
        const { topic } = params
        const data = await request.formData()
        await saveTopic(data)
        throw redirect(302, `/edit/${topic}`)
    }
}
