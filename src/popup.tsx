import * as RadixLabel from '@radix-ui/react-label'
import iconHref from 'data-base64:~assets/icon.png'
import type { ChangeEvent } from 'react'
import isURL from 'validator/lib/isURL'

import { TextInput } from '~components/input'
import { Link } from '~components/link'
import { ToggleButton } from '~components/toggle'
import { useProxyStatus, useProxyTarget } from '~stores/storage'

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

  const handleProxyTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProxyTarget({ type: 'workers', host: e.target.value })
  }

  try {
    const isValid = isURL(proxyTarget.host, {})
  } catch (error) {}

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
            onChange={() => setProxyState(!isProxyActive)}
            id="proxy-toggle"
          />
        </ToggleArea>
        <InputArea>
          <InputLabel htmlFor="workers-url-input">Workers URL</InputLabel>
          <InputDescription>
            프록시 기능을 사용하기 위해{' '}
            <Link href="" target="_blank">
              Cloudflare Workers
            </Link>
            를 만들어야 합니다.
          </InputDescription>
          <TextInput
            id="workers-url-input"
            placeholder="https://proxy.ktb.workers.dev/"
            onChange={handleProxyTargetChange}
            css={{ margin: '8px 0' }}></TextInput>
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
