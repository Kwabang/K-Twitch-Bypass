import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface Body {
  type: boolean
}

const BYPASS_RULE_ID = [1001, 1002]
const BYPASS_RULE_PRIORITY = [1, 2]

const ISP_API_ENDPOINT = 'https://api.kwabang.net/isp'

async function enableBypass() {
  let segmentNode: string
  let response: Response
  try {
    response = await fetch(ISP_API_ENDPOINT)
    response = await response.json()
    switch (response['autonomous_system_number']) {
      case 4766: // KT
        segmentNode = 'limelight_kt'
        break
      case 9318: // SKB
        segmentNode = 'limelight_sk'
        break
      case 3786: // LG
        segmentNode = 'limelight_lg'
        break
      default: // Other ISPs
        segmentNode = 'akamai_korea'
    }
  } catch (error) {
    console.error(error)
    segmentNode = 'akamai_korea'
  }

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
          }]
        },
        condition: {
          regexFilter: '^https://usher.ttvnw.net/api/channel/hls/(.*)',
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
          ]
        }
      },
      {
        id: BYPASS_RULE_ID[1],
        priority: BYPASS_RULE_PRIORITY[1],
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [{
                  key: 'force_segment_node',
                  value: segmentNode
                }]
              }
            }
          }
        },
        condition: {
          regexFilter: '^https://usher.ttvnw.net/api/channel/hls/(.*)',
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
          ]
        }
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
