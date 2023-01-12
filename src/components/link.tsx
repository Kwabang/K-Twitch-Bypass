import { styled } from '~libs/stitches'

export const Link = styled('a', {
  color: '$violet9',
  textDecoration: 'none',
  '&:hover': {
    color: '$violet10',
    textDecoration: 'underline',
  },
})
