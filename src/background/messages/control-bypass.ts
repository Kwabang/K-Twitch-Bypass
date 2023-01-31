import type { PlasmoMessaging } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'

import type { ISPListStorage } from '~stores/storage'

export interface Body {
  type: boolean
}

interface ISPAPIBody {
  autonomous_system_number: number
  autonomous_system_organization: string
}

enum CDNType {
  kt = 'limelight_kt',
  skb = 'limelight_sk',
  lg = 'limelight_lg',
  others = 'akamai_korea',
}

const storage = new Storage()

const BYPASS_RULE_ID = [1001, 1002]
const BYPASS_RULE_PRIORITY = [1, 2]

const ISP_API_ENDPOINT = 'https://api.kwabang.net/isp'

async function getCurrentCDN(): Promise<CDNType> {
  let segmentNode: CDNType = CDNType.others

  try {
    const res = await fetch(ISP_API_ENDPOINT)
    const data = (await res.json()) as ISPAPIBody

    switch (data['autonomous_system_number']) {
      case 4766: // KT
        segmentNode = CDNType.kt
        break
      case 9318: // SKB
        segmentNode = CDNType.skb
        break
      case 3786: // LG
        segmentNode = CDNType.lg
        break
    }
  } catch (error) {
    console.error(error)
  }

  return segmentNode
}

async function enableBypass() {
  const configuredISP = await storage.get<ISPListStorage>('bypassISPList')
  let currentCDN: CDNType = CDNType[configuredISP]

  if (configuredISP === 'auto') {
    currentCDN = await getCurrentCDN()
  }

  return chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: BYPASS_RULE_ID[0],
        priority: BYPASS_RULE_PRIORITY[0],
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
      {
        id: BYPASS_RULE_ID[1],
        priority: BYPASS_RULE_PRIORITY[1],
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [
                  {
                    key: 'force_segment_node',
                    value: currentCDN,
                  },
                  {
                    key: 'force_manifest_node',
                    value: 'video-weaver.sel03'
                  }
                ],
              },
            },
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

function disableBypass() {
  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: BYPASS_RULE_ID,
  })
}

async function reloadBypass() {
  await disableBypass()
  return await enableBypass()
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

storage.watch({
  bypassISPList: () => reloadBypass(),
})
