# Twitch Tokyo Server Fix Tool
한국 트위치의 720p 영상 화질 제한을 우회하기 위한 브라우저 확장 프로그램으로, 현재 Chromium과 Firefox 기반 브라우저를 지원합니다.
VPN/프록시를 통한 연결과는 달리 프록시를 통해 HLS 서버가 일본에서 접속 중인 것으로 판단하게 만들고, 스트리밍 서버와의 연결은 VPN/프록시를 거치지 않습니다.
해외망 이용이 원활하지 않은 ISP를 사용할 경우 속도 저하 현상이 발생할 수 있습니다.

This is a browser extension to bypass the 720p video quality limit of Twitch in Korea. It is currently supported in Chromium and Firefox-based browsers.
Unlike the connection via VPN/proxy, this extension makes the Twitch HLS server determine that you are connecting from Japan (by connecting from a proxy) and makes a direct connection to the actual streaming server without passing through the VPN/proxy network.
If you use an ISP that does not have a good overseas network, you may experience a slowdown in speed.

# 한국어
## 설치하기
### Chromium 기반 브라우저 (Chrome, Whale, Edge, Opera, Brave 등)
#### Chrome 웹 스토어에서 내려받기
[Chrome 웹 스토어](https://chrome.google.com/webstore/detail/twitch-tokyo-server-fix-t/hohebaajomacpbgjdfjkinekpbfelege/related?hl=ko)에서 내려받을 수 있습니다.

#### 직접 설치하기
https://user-images.githubusercontent.com/55907150/194024485-b0166ff8-dd01-4096-aa66-53a677f7c575.mp4
1. 본 레포지토리의 [Releases](https://github.com/Kwabang/Twitch-Tokyo-Server-Fix-Tool/releases)에서 최신 버전의 확장 프로그램을 내려받습니다.
2. 내려받은 확장 프로그램의 압축을 해제합니다.
3. `chrome://extensions`에 방문한 후 **개발자 모드**를 활성화합니다.
4. *압축해제된 확장 프로그램을 로드합니다.*를 누르고 2단계에서 압축을 해제한 확장 프로그램의 디렉토리(폴더)를 선택합니다.
5. 불러와진 압축 프로그램을 활성화합니다.

### Firefox 등 Gecko 기반 브라우저
#### Firefox 웹 스토어에서 내려받기
[Firefox 웹 스토어](https://addons.mozilla.org/ko/firefox/addon/twitch-tokyo-server-fix-tool/)에서 내려받을 수 있습니다.

# English
## Install
### Chromium-Based Browsers, including Chrome, Edge, Opera, and Brave
#### Installing via Chrome Web Store
You can now install this extension by heading over to [Chrome Web Store](https://chrome.google.com/webstore/detail/twitch-tokyo-server-fix-t/hohebaajomacpbgjdfjkinekpbfelege/related?hl=ko).

#### Manual Installation
1. Download the latest version of the extension at the [Releases](https://github.com/Kwabang/Twitch-Tokyo-Server-Fix-Tool/releases) section.
2. Extract the archived extension you just downloaded.
3. Visit `chrome://extensions` and enable **Developer Mode**.
4. Click on *Load Unpacked* and select the directory of the extension you unarchived in step 2.
5. Enable the loaded extension.

### Gecko-Based Browser, including Firefox and Pale Moon
#### Installing via Firefox Web Store
You can now install this extension by heading over to [Firefox Web Store](https://addons.mozilla.org/ko/firefox/addon/twitch-tokyo-server-fix-tool/).

## Contribution
본 프로젝트는 풀 리퀘스트를 통한 기여를 받고 있습니다.
주요 변경 사항의 경우 먼저 이슈를 열어 변경하고 싶은 사항에 대해 논의해주세요.

This project is receiving contributions through pull requests.
For major changes, first open an issue to discuss what you would like to change.

## LICENSE
Distributed by [MIT License](https://github.com/Kwabang/Twitch-Tokyo-Server-Fix-Tool/blob/main/LICENSE)
