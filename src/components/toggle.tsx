// Source: https://uiverse.io/adamgiebl/grumpy-moth-36

import type { InputHTMLAttributes } from 'react'

import { styled } from '~libs/stitches'

const Label = styled('label', {
  fontSize: '14px',
  position: 'relative',
  display: 'inline-block',
  width: '3.5em',
  height: '2em',
})

const Input = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
})

const Slider = styled('span', {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$gray5',
  transition: '.4s',
  borderRadius: '30px',

  '&:before': {
    position: 'absolute',
    content: '',
    height: '1.4em',
    width: '1.4em',
    borderRadius: '20px',
    left: '0.3em',
    bottom: '0.3em',
    backgroundColor: 'white',
    transition: '.2s',
  },

  [`${Input}:checked + &`]: {
    backgroundColor: '$violet9',
  },
  [`${Input}:focus + &`]: {
    boxShadow: '0 0 1px $violet9',
  },
  [`${Input}:checked + &:before`]: {
    transform: 'translateX(1.5em)',
  },
})

export function ToggleButton({
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Label>
      <Input id={id} type="checkbox" {...props} />
      <Slider />
    </Label>
  )
}
