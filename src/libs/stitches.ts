import * as colors from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const { styled, css } = createStitches({
  theme: {
    colors: {
      ...colors.violet,
      ...colors.gray,
    },
  },
})
