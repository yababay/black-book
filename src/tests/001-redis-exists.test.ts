import { describe, it, expect } from 'vitest';
import { createClient } from 'redis';

describe('redis db', () => {
	it('should be connected', async () => {
        const client = createClient()
        await client.connect()
        const key = 'test:counter'
        await client.incr(key)
        const count = await client.get(key)
        expect(count && +count).greaterThan(0)
        await client.del(key)
        client.quit()
    });
});
