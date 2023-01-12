import { styled } from '~libs/stitches'

export const TextInput = styled('input', {
  width: '100%',
  fontSize: '0.9rem',
  padding: '0.6em 0.4em',
  boxSizing: 'border-box',
  border: '1px solid $gray7',
  backgroundColor: '$gray1',
  borderRadius: '3px',
  outline: 0,

  '&::placeholder': {
    color: '$gray9',
  },
  '&:focus': {
    border: '1px solid $blue8',
    boxShadow: '0 0 0 1px $blue8',
  },
})
