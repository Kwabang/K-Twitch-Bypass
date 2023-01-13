// @ts-nocheck

import { Storage } from '@plasmohq/storage'

import type { ProxyTargetsStorage } from '~stores/storage'

const storage = new Storage()
const { host } = await storage.get<ProxyTargetsStorage>('proxyTarget')

function updateRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1001,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            regexSubstitution: 'https://api.twitch.hkg.kwabang.net/hls-raw/\\1', // host
          },
        },
        condition: {
          regexFilter: '^https://usher.ttvnw.net/api/channel/hls/(.*)',
          resourceTypes: ['xmlhttprequest'],
        },
      },
    ],
    removeRuleIds: [1001],
  })
}

chrome.tabs.onActivated.addListener(() => {
  updateRules()
})

export {}
