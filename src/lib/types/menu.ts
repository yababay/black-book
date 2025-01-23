import { TOPIC_KEYS, TOPIC_RECORDS } from "./topic"

export type MenuItem = {
    title: string
    href?: string
    icon?: string
    items?: MenuItems
}

export type MenuItems = MenuItem[]

export const TOPIC_MENU: MenuItems = TOPIC_KEYS.map((topic) => {
    const { title, icon } = TOPIC_RECORDS[topic]
    return { title, icon, href: `/edit/${topic}` }
})
