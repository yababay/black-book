import { TOPIC_KEYS } from '$lib/types/index.js'

export const csr = false

export const load = async ({url}) => {
    const { pathname } = url
    const topic = TOPIC_KEYS.find(key => pathname.includes(`/${key}`)) || ''
    return { topic }
}
