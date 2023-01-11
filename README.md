# K-Twitch-Bypass
한국 트위치의 720p 영상 화질 제한을 우회하기 위한 브라우저 확장 프로그램으로, 현재 Chromium과 Firefox 기반 브라우저를 지원합니다.
VPN/프록시를 통한 연결과는 달리 프록시를 통해 HLS 서버가 일본에서 접속 중인 것으로 판단하게 만들고, 스트리밍 서버와의 연결은 VPN/프록시를 거치지 않습니다.
해외망 이용이 원활하지 않은 ISP를 사용할 경우 속도 저하 현상이 발생할 수 있습니다.

This is a browser extension to bypass the 720p video quality limit of Twitch in Korea. It is currently supported in Chromium and Firefox-based browsers.
Unlike the connection via VPN/proxy, this extension makes the Twitch HLS server determine that you are connecting from Japan (by connecting from a proxy) and makes a direct connection to the actual streaming server without passing through the VPN/proxy network.
If you use an ISP that does not have a good overseas network, you may experience a slowdown in speed.

# 한국어
## 설치하기
### Chromium 기반 브라우저 (Chrome, Whale, Edge, Opera, Brave 등)
[Chrome 웹 스토어](https://chrome.google.com/webstore/detail/twitch-tokyo-server-fix-t/hohebaajomacpbgjdfjkinekpbfelege/related?hl=ko)를 방문하여 내려받을 수 있습니다.

### Firefox 등 Gecko 기반 브라우저
[Add-Ons for Firefox](https://addons.mozilla.org/ko/firefox/addon/k-twitch-bypass/)를 방문하여 내려받을 수 있습니다.

# English
## Install
### Chromium-Based Browsers, including Chrome, Edge, Opera, and Brave
You can install this extension by heading over to the [Chrome Web Store](https://chrome.google.com/webstore/detail/twitch-tokyo-server-fix-t/hohebaajomacpbgjdfjkinekpbfelege/related?hl=ko).

### Gecko-Based Browser, including Firefox and Pale Moon
You can install this extension by heading over to the [Add-Ons for Firefox](https://addons.mozilla.org/ko/firefox/addon/k-twitch-bypass/).

## Contribution
본 프로젝트는 풀 리퀘스트를 통한 기여를 받고 있습니다.
주요 변경 사항의 경우 먼저 이슈를 열어 변경하고 싶은 사항에 대해 논의해주세요.

This project is receiving contributions through pull requests.
For major changes, first open an issue to discuss what you would like to change.

## Sponsor
본 프로젝트의 서버는 [Pluxcon Network USA LLC](https://pluxcon.network) 의 후원으로 유지되고 있습니다.

The server of this project is maintained with the support of [Pluxcon Network USA LLC](https://pluxcon.network).
## LICENSE
Distributed by [MIT License](https://github.com/Kwabang/K-Twitch-Bypass/blob/main/LICENSE)
