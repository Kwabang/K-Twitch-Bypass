import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface Body {
  type: boolean
}

function enableProxy() {
  return chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1001,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [
            {
              operation: chrome.declarativeNetRequest.HeaderOperation.SET,
              header: 'X-Forwarded-For',
              value: '::1',
            },
          ],
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
    removeRuleIds: [1001],
  })
}

export const handler: PlasmoMessaging.MessageHandler<Body> = async (
  req,
  res,
) => {
  const { type } = req.body

  if (type) {
    return await enableProxy()
  }

  return await disableProxy()
}
