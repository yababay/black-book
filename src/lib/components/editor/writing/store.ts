import { writable, type Writable } from 'svelte/store';

export const prevAuthor: Writable<string> = writable('')
export const prevSource: Writable<string> = writable('')
