import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL, WEBHOOK } from '$env/static/private'
import { Telegram } from 'telegraf'
import { getMessage } from '$lib/server/connection'
import type { ParseMode } from 'telegraf/types'
import { checkConnection } from '$lib/server/connection'
import { type TOPIC_TYPE } from '$lib/types/topic'

const telegram = new Telegram(TELEGRAM_BOT_TOKEN)
const options: {parse_mode: ParseMode, caption?: string, link_preview_options: {is_disabled: boolean}} = { parse_mode: 'Markdown', link_preview_options: {is_disabled: true} }

export const GET = async({ params }) => {
    await checkConnection()
    const { webhook, topic } = params
    if(webhook !== WEBHOOK) throw 'rejected'
    const props = await getMessage(topic as TOPIC_TYPE)
    const { body, source } = props
    let message = body
    if(source && source.trim()) message += `\n\n${source}`
    await telegram.sendMessage(TELEGRAM_CHANNEL, message, options)
    return new Response('ok')
}
