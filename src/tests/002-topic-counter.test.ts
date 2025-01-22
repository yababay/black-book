import { nextTopicId } from '$lib/server/connection';
import { TOPIC_COUNTER_START_VALUE } from '$lib/types';
import { describe, it, expect } from 'vitest';

describe('topic counter', () => {
    it('should be increased', async () => {
        const countFirst = await  nextTopicId()
        expect(countFirst).greaterThanOrEqual(TOPIC_COUNTER_START_VALUE)
        const countSecond = await nextTopicId()
        expect(countSecond).greaterThan(countFirst)
    })
})
