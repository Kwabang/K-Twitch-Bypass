var browser = globalThis.browser || globalThis.chrome;

function redirectToAPI(details) {
  return {
    redirectUrl: `https://api.twitch.hkg.kwabang.net/hls-raw/${encodeURIComponent(details.url.split('/')[6])}`,
  }
}

browser.webRequest.onBeforeRequest.addListener(
  redirectToAPI, {
    urls: ["https://usher.ttvnw.net/api/channel/hls/*"]
  },
  ["blocking"]
)