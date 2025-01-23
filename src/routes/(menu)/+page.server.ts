import { saveTopis } from '$lib/server/routes'
import { PREV_SOURCE } from '$lib/types/constants'

export const load = async ({ cookies }) => {
    const prev = cookies.get(PREV_SOURCE) || ''
    return { prev }
}

export const actions = {
    default: async ({request, cookies}) => {
        const data = await request.formData()
        const message = await saveTopis(data)
        const prev = Reflect.get(message, 'source')
        if(prev) cookies.set(PREV_SOURCE, prev, { path: '/' })
        return { prev }
    }
}
