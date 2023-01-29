import * as RadixLabel from '@radix-ui/react-label'
import iconHref from 'data-base64:~assets/icon.png'
import { ChangeEvent, useEffect, useState } from 'react'
import isURL from 'validator/lib/isURL'

import { TextInput } from '~components/input'
import { Link } from '~components/link'
import { ToggleButton } from '~components/toggle'
import { useProxyStatus, useProxyTarget } from '~stores/storage'
import { disableProxy, enableProxy } from '~utils/control-proxy'

import { globalStyles, styled } from './libs/stitches'

import './styles/common.css'
import './styles/fonts.css'

const Container = styled('div', {
  minWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
})

const Icon = styled('img', {
  width: '40px',
  marginRight: '2px',
})

const StatusCircle = styled('div', {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  marginLeft: '6.5px',
  marginBottom: '-3px',

  variants: {
    isActive: {
      true: {
        backgroundColor: '$violet9',
      },
      false: {
        backgroundColor: '$gray7',
      },
    },
  },
})

const Header = styled('div', {
  userSelect: 'none',
  padding: '1.2em 0.8em',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid $gray3',
})

const HeaderText = styled('span', {
  fontSize: '1.3rem',

  variants: {
    type: {
      bold: {
        fontWeight: 500,
      },
      thin: {
        fontWeight: 200,
      },
    },
  },
})

const Content = styled('div', {
  padding: '2em 1.5em',
})

const ToggleArea = styled('div', {
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const ToggleLabel = styled('label', {
  cursor: 'pointer',
  userSelect: 'none',
})

const InputArea = styled('div', {
  marginTop: '2em',
})

const InputLabel = styled(RadixLabel.Root, {
  fontSize: '0.8rem',
  fontWeight: 500,
  lineHeight: '180%',
})

const InputDescription = styled('div', {
  color: '$gray11',
  fontSize: '0.7rem',
})

const SecondaryButton = styled('button', {
  color: '$gray11',
  background: 'none',
  border: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '0.65rem',
  marginLeft: '-7px',
})

const Footer = styled('div', {
  borderTop: '1px solid $gray3',
  color: '$gray11',
  padding: '2em 0',
  textAlign: 'center',
})

function IndexPopup() {
  globalStyles()

  const [isProxyActive, setProxyState] = useProxyStatus()
  const [proxyTarget, setProxyTarget] = useProxyTarget()
  const [isProxyUrlValid, setProxyUrlValid] = useState<boolean>()

  useEffect(() => {
    if (isProxyActive) {
      enableProxy()
    } else {
      disableProxy()
    }
  }, [isProxyActive])

  const handleProxyStateChange = () => {
    setProxyState(!isProxyActive)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]

      if (activeTab.url.startsWith('https://www.twitch.tv')) {
        chrome.tabs.reload()
      }
    })
  }

  const handleProxyTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProxyTarget({ type: 'workers', host: e.target.value })
  }

  useEffect(() => {
    const isValid = isURL(proxyTarget.host, { require_protocol: true })
    setProxyUrlValid(isValid)
  }, [proxyTarget.host])

  return (
    <Container>
      <Header>
        <Icon src={iconHref} alt="K-Twitch-Bypass" />
        <HeaderText type="bold">K-Twitch </HeaderText>&nbsp;
        <HeaderText type="thin">Bypass</HeaderText>
        <StatusCircle isActive={isProxyActive} />
      </Header>
      <Content>
        <ToggleArea>
          <ToggleLabel htmlFor="proxy-toggle">프록시 활성화</ToggleLabel>
          <ToggleButton
            checked={isProxyActive}
            onChange={handleProxyStateChange}
            id="proxy-toggle"
          />
        </ToggleArea>
        <InputArea>
          <InputLabel htmlFor="workers-url-input">프록시 URL</InputLabel>
          <InputDescription>
            이 입력 칸이 무엇을 의미하는지 잘 모른다면, 그대로 내버려두세요.
          </InputDescription>
          <TextInput
            id="workers-url-input"
            value={proxyTarget.host}
            onChange={handleProxyTargetChange}
            css={{ margin: '8px 0' }}
            type={!isProxyUrlValid ? 'warning' : 'normal'}></TextInput>
          {!isProxyUrlValid && (
            <InputDescription css={{ color: '$red9', marginBottom: '4px' }}>
              올바르지 않은 URL입니다.
            </InputDescription>
          )}
          <SecondaryButton
            onClick={() =>
              setProxyTarget((targets) => ({
                ...targets,
                host: 'https://api.twitch.tyo.kwabang.net',
              }))
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="#6f6f6f"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
            초깃값으로 되돌리기
          </SecondaryButton>
        </InputArea>
      </Content>
      <Footer>
        Sources on{' '}
        <Link href="https://github.com/Kwabang/K-Twitch-Bypass" target="_blank">
          Github
        </Link>
      </Footer>
    </Container>
  )
}

export default IndexPopup
