import * as colors from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const { styled, css, globalCss } = createStitches({
  theme: {
    colors: {
      ...colors.gray,
      ...colors.violet,
      ...colors.blue,
      ...colors.red,
    },
  },
})

export const globalStyles = globalCss({
  '*': {
    color: '$gray12',
  },
})
