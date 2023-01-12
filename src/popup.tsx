import iconHref from 'data-base64:~assets/icon.png'

import { Link } from '~components/link'
import { ToggleButton } from '~components/toggle'

import { styled } from './libs/stitches'

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

const Header = styled('div', {
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
  minHeight: 300,
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
  return (
    <Container>
      <Header>
        <Icon src={iconHref} alt="K-Twitch-Bypass" />
        <HeaderText type="bold">K-Twitch </HeaderText>&nbsp;
        <HeaderText type="thin">Bypass</HeaderText>
      </Header>
      <Content>
        <ToggleArea>
          <ToggleLabel htmlFor="proxy-toggle">프록시 활성화</ToggleLabel>
          <ToggleButton id="proxy-toggle" />
        </ToggleArea>
      </Content>
      <Footer>
        Made by{' '}
        <Link href="https://github.com/kwabang" target="_blank">
          Kwabang
        </Link>
      </Footer>
    </Container>
  )
}

export default IndexPopup
