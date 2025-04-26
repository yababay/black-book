import { checkConnection, client, saveTopic } from '$lib/server/connection'
import { redirect } from '@sveltejs/kit'

const base = 'https://corpus.prozhito.org/api'
const diaries = 'diaries'

const adjust = (text: string) => text
    .replaceAll('</p>', '\n\n')
    .replace(/\<\/?[a-zA-Z]+\>/g, ' ')
    .replace(/(\r\n){2,}/g, '%%')
    .replace(/\n{2,}/g, '%%')
    .replace(/[\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .replaceAll('%%', '\n\n')
    .replaceAll('\n ', '\n')
    .replace(/^\s+/g, '')

export const load = async ({fetch, params}) => {
    await checkConnection()
    const { id } = params
    const lastKey = `${diaries}:last:${id}`
    const persKey = `${diaries}:person:${id}`
    const last = await client.get(lastKey)
    const noteKey = `${persKey}:note:${last}`
    const person = await client.hGetAll(persKey)
    person.key = id

    if(await client.exists(noteKey)) {
        const all = await client.hGetAll(noteKey)
        if(!(all.text && all.date)) throw 'corrupted note in the db'
        const { text, date } = all
        const note = { id: last, text: adjust(text), date } 
        console.log(note)
        return { person, note }
    }
    const obj  = await fetch(`${base}/notes/${last}`).then((res: Response) => res.json())
    if(!(obj.text && obj.date)) throw 'corrupted note on the site'
    const { text, date } = obj
    await client.hSet(noteKey, 'text', text)
    await client.hSet(noteKey, 'date', date)
    const note = { id: last, text: adjust(text), date } 
    return { person, note }
}

export const actions = {
    default: async ({request, params}) => {
        const { id } = params
        const data = await request.formData()
        const hide = data.get('hide')?.toString()
        if(hide) {
            const last = await client.get(`diaries:last:${id}`)
            if(last) await client.hSet(`diaries:person:${id}`, 'last', last)
            throw redirect(302, '/diary')
        }
        const omit = data.get('omit')?.toString()
        const direction = data.get('direction')?.toString()
        if(direction === 'forward') await client.incr(`diaries:last:${id}`)
        else if(direction === 'back') {
            const from = await client.hGet(`diaries:person:${id}`, 'from')
            if(!from || isNaN(+from)) throw 'bad from'
            const last = await client.get(`diaries:last:${id}`)
            if(last && +last > +from) await client.decr(`diaries:last:${id}`)
        }
        if(!omit) {
            const source = data.get('author')?.toString().trim()
            const body = data.get('message')?.toString().trim()
            if(!(source && body)) throw 'no source or body'
            await saveTopic({body, source, topic: 'memo'})
        }
        return {ok:1}
    }
}
