import { client, checkConnection } from '$lib/server/connection'

export const load = async () => {
    await checkConnection()
    const keys = (await client.keys('diaries:person:*')).filter(key => /^diaries:person:\d+$/.test(key))
    const persons = (await Promise.all(keys.map(key => client.hGetAll(key))))
    .map((pers, i) => ({...pers, last: pers.last || false, key: keys[i].split(':')[2]}))
    .filter(pers => !pers.last)
    persons.sort((a, b) => Reflect.get(a, 'lastname').localeCompare(Reflect.get(b, 'lastname')))
    return { persons }
}
