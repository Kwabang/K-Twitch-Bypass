import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface Body {
  type: boolean
}

const BYPASS_RULE_ID = [1001]
const BYPASS_RULE_PRIORITY = [1]

function enableBypass() {
  return chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
        id: BYPASS_RULE_ID[0],
        priority: BYPASS_RULE_PRIORITY[0],
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [{
            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            header: 'X-Forwarded-For',
            value: '::1',
          }, ],
        },
        condition: {
          regexFilter: '^https://usher.ttvnw.net/api/channel/hls/(.*)',
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
          ],
        },
      }
    ]
  })
}

function disableBypass() {
  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: BYPASS_RULE_ID,
  })
}

export const handler: PlasmoMessaging.MessageHandler<Body> = async (
  req,
  res,
) => {
  const { type } = req.body

  if (type) {
    return await enableBypass()
  }

  return await disableBypass()
}
