import { styled } from '~libs/stitches'

export const TextInput = styled('input', {
  width: '100%',
  fontSize: '0.9rem',
  padding: '0.6em 0.4em',
  boxSizing: 'border-box',
  borderRadius: '3px',
  outline: 0,

  '&::placeholder': {
    color: '$gray9',
  },

  variants: {
    type: {
      normal: {
        border: '1px solid $gray7',
        backgroundColor: '$gray1',

        '&:focus': {
          border: '1px solid $blue8',
          boxShadow: '0 0 0 1px $blue8',
        },
      },
      warning: {
        color: '$red9',
        border: '1px solid $red7',
        backgroundColor: '$red2',

        '&:focus': {
          border: '1px solid $red8',
          boxShadow: '0 0 0 1px $red8',
        },
      },
    },
  },
  defaultVariants: {
    type: 'normal',
  },
})
