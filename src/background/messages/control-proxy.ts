import type { PlasmoMessaging } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'

import type { ProxyTargetsStorage } from '~stores/storage'

export interface Body {
  type: boolean
}

const storage = new Storage()

const PROXY_RULE_ID = 1001
const PROXY_RULE_PRIORITY = 1

const DEFAULT_PROXY_HOST = 'https://api.twitch.tyo.kwabang.net'

function enableProxy(host = DEFAULT_PROXY_HOST) {
  return chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: PROXY_RULE_ID,
        priority: PROXY_RULE_PRIORITY,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            regexSubstitution: `${host}/hls-raw/\\1`,
          },
        },
        condition: {
          regexFilter: '^https://usher.ttvnw.net/api/channel/hls/(.*)',
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
          ],
        },
      },
    ],
  })
}

function disableProxy() {
  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [PROXY_RULE_ID],
  })
}

async function reloadProxy(host = DEFAULT_PROXY_HOST) {
  await disableProxy()
  return await enableProxy(host)
}

export const handler: PlasmoMessaging.MessageHandler<Body> = async (
  req,
  res,
) => {
  const { type } = req.body

  if (type) {
    const { host } = await storage.get<ProxyTargetsStorage>('proxyTarget')
    return await enableProxy(host)
  }

  return await disableProxy()
}

storage.watch({
  proxyTarget: (c) => {
    reloadProxy(c.host)
  },
})
