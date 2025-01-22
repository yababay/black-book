export type TOPIC_TYPE = 'fact' | 'quotation' | 'memo' | 'draft'

export const TOPICS_MENU: Record<TOPIC_TYPE, string> = {
    fact: 'Факт',
    quotation: 'Цитата',
    memo: 'Заметка',
    draft: 'Черновик'
}

export type Topic = {
    body: string
    id?: number
    topic?: TOPIC_TYPE
    source?: string
}

export type Message = Required<Pick<Topic, 'body' | 'id' | 'topic'>> & Pick<Topic, 'source'>

export * from './constants'
