import { deleteTopic, getTopic, saveTopic } from '$lib/server/connection';
import { type Topic } from '$lib/types';
import { describe, it, expect } from 'vitest';

describe('topic', () => {
    it('should be saved and updated', async () => {
        let body = 'hello'
        let source = 'world'
        const topic = 'fact'
        let message: Topic = { body, source, topic }
        const id = await saveTopic(message)
        expect(id).toBeTypeOf('number')
        console.log(id) 
        message = await getTopic(topic, id)
        expect(message.body).eq(body)
        expect(message.source).eq(source)
        expect(message.topic).eq(topic)
        expect(message.id).eq(id)
        /*body += '!'
        source += '!'
        message = { body, source, topic, id }
        await saveTopic(message)
        message = await getTopic(topic, id) 
        expect(message.body).eq(body)
        expect(message.source).eq(source)
        expect(message.topic).eq(topic)
        expect(message.id).eq(id)*/
        const ok = await deleteTopic(topic, id)
        expect(ok).toBeTruthy() 
    })
})
