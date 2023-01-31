import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import iconHref from 'data-base64:~assets/icon.png'
import { useEffect } from 'react'

import { Link } from '~components/link'
import * as Select from '~components/select'
import { ToggleButton } from '~components/toggle'
import { ISPListStorage, useBypassISP, useBypassStatus } from '~stores/storage'
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

const AreaHeaderContainer = styled('div', {
  margin: '0.5em 0',
})

const AreaHeader = styled('div', {
  fontSize: '0.8rem',
  fontWeight: '600',
})

const AreaSecondaryHeader = styled('div', {
  fontSize: '0.7rem',
  fontWeight: '400',
  color: '$gray11',
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

const SelectArea = styled('div', {
  width: '100%',
  marginTop: '2em',
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
  const [currentISP, setCurrentISP] = useBypassISP()

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

  const handleISPSelectChange = (value: string) => {
    setCurrentISP(value as ISPListStorage)
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
        <SelectArea>
          <AreaHeaderContainer>
            <AreaHeader>ISP 선택</AreaHeader>
            <AreaSecondaryHeader>
              이용중인 ISP에 따라 트위치의 서버가 선택됩니다. 기본값은
              '자동'입니다.
            </AreaSecondaryHeader>
          </AreaHeaderContainer>
          <Select.Root onValueChange={handleISPSelectChange} value={currentISP}>
            <Select.Trigger aria-label="ISP">
              <Select.Value placeholder="ISP 선택..." />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.ScrollUpButton>
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>ISPs</Select.Label>
                    <Select.Item value="auto">자동 (추천)</Select.Item>
                    <Select.Item value="kt">KT</Select.Item>
                    <Select.Item value="skb">SKB</Select.Item>
                    <Select.Item value="lg">LGU+</Select.Item>
                    <Select.Item value="others">기타</Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton>
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </SelectArea>
      </Content>
      <Footer>
        Version 2.5 | Sources on{' '}
        <Link href="https://github.com/Kwabang/K-Twitch-Bypass" target="_blank">
          Github
        </Link>
      </Footer>
    </Container>
  )
}

export default IndexPopup
