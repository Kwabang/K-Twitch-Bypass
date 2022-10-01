function redirectToAPI(details) {
  return {
    redirectUrl: `https://api.twitch.tyo.kwabang.net/hls-raw/${encodeURIComponent(details.url.split('/')[6])}`,
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  redirectToAPI, {
    urls: ["https://usher.ttvnw.net/api/channel/hls/*"]
  },
  ["blocking"]
)