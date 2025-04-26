import { saveTopic } from '$lib/server/routes.js'

export const load = () => ({ failure: false })

export const actions = {
    default: async ({request}) => {
        const data = await request.formData()
        return await saveTopic(data)
    }
}
