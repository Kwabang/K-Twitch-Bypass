import iconHref from 'data-base64:~assets/icon.png'
import { useEffect } from 'react'

import { Link } from '~components/link'
import { ToggleButton } from '~components/toggle'
import { useBypassStatus } from '~stores/storage'
import { disableBypass, enableBypass } from '~utils/control-bypass'

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

const Footer = styled('div', {
  borderTop: '1px solid $gray3',
  color: '$gray11',
  padding: '2em 0',
  textAlign: 'center',
})

function IndexPopup() {
  globalStyles()

  const [isBypassActive, setBypassState] = useBypassStatus()

  useEffect(() => {
    if (isBypassActive) {
      enableBypass()
    } else {
      disableBypass()
    }
  }, [isBypassActive])

  const handleBypassStateChange = () => {
    setBypassState(!isBypassActive)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]

      if (activeTab.url.startsWith('https://www.twitch.tv')) {
        chrome.tabs.reload()
      }
    })
  }

  return (
    <Container>
      <Header>
        <Icon src={iconHref} alt="K-Twitch-Bypass" />
        <HeaderText type="bold">K-Twitch </HeaderText>&nbsp;
        <HeaderText type="thin">Bypass</HeaderText>
        <StatusCircle isActive={isBypassActive} />
      </Header>
      <Content>
        <ToggleArea>
          <ToggleLabel htmlFor="bypass-toggle">우회 활성화</ToggleLabel>
          <ToggleButton
            checked={isBypassActive}
            onChange={handleBypassStateChange}
            id="bypass-toggle"
          />
        </ToggleArea>
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
