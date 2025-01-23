export type TOPIC_TYPE = 'fact' | 'quotation' | 'memo' | 'draft'

export const TOPIC_RECORDS: Record<TOPIC_TYPE, {title: string, icon: string}> = {
    draft: {title: 'Черновики', icon: 'pencil-fill'},
    fact: {title: 'Факты', icon: 'info-square-fill'},
    quotation: {title: 'Цитаты', icon: 'chat-left-quote-fill'},
    memo: {title: 'Заметки', icon: 'sticky-fill'}
}

export const TOPIC_KEYS = Reflect.ownKeys(TOPIC_RECORDS) as TOPIC_TYPE[]

export type Topic = {
    body: string
    id?: number
    topic?: TOPIC_TYPE
    source?: string
}

export type Message = Required<Pick<Topic, 'body' | 'id' | 'topic'>> & Pick<Topic, 'source'>

export * from './constants'
