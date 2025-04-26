import { writable, derived, type Writable } from "svelte/store"

const STUB = '/stub.png'

export const blob = writable<File | null>(null)

export const uploaded = derived<Writable<File | null>, () => Promise<string>>(blob, $blob => async() => {
    if(!$blob) return STUB
    if (!window.FileReader) throw 'There is no filereader'

    const Base64 = new Promise<string>((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            if (dataUrl == null) return reject('no data url')
            resolve(dataUrl.toString()); // <= here
        };
        reader.onerror = function() {
            reject('Incorrect blob or file object.');
        };
        reader.readAsDataURL($blob)
    })
    
    const body = await Base64

    return await fetch('/api/upload', {method: 'post', headers: {'Content-Type': 'text/plain'}, body})
    .then(resp => resp?.text())
})
