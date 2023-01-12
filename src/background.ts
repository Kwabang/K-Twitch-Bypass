// @ts-nocheck

export {}

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1001,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            regexSubstitution: "https://api.twitch.hkg.kwabang.net/hls-raw/\\1"
          }
        },
        condition: {
          regexFilter: "^https://usher.ttvnw.net/api/channel/hls/(.*)",
          resourceTypes: ["xmlhttprequest"]
        }
      }
    ],
    removeRuleIds: [1001]
  })
})
