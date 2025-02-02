import { saveTopis } from '$lib/server/routes'
import { PREV_SOURCE, PREV_TOPIC } from '$lib/types/constants'

export const load = async ({ cookies }) => {
    const prev = cookies.get(PREV_SOURCE) || ''
    const topic = cookies.get(PREV_TOPIC) || ''
    return { prev, topic }
}

export const actions = {
    default: async ({request, cookies}) => {
        const data = await request.formData()
        const message = await saveTopis(data)
        if(Reflect.has(message, 'failure')) return message
        const prev = Reflect.get(message, 'source')
        const topic = Reflect.get(message, 'topic')
        if(prev) cookies.set(PREV_SOURCE, prev, { path: '/' })
        cookies.set(PREV_TOPIC, topic, { path: '/' })
        return { prev, topic }
    }
}
