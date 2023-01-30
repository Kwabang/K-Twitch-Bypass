import { mauve, violet } from '@radix-ui/colors'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'

import { styled } from '~libs/stitches'

export {
  Group,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Value,
} from '@radix-ui/react-select'

export const Trigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid $gray7',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  width: '100%',
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  color: violet.violet11,
  '&:hover': { backgroundColor: mauve.mauve3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-placeholder]': { color: violet.violet9 },
})

export const Icon = styled(Select.SelectIcon, {
  color: violet.violet11,
})

export const Content = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const Viewport = styled(Select.Viewport, {
  padding: 5,
})

// const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
//   return (
//     <StyledItem {...props} ref={forwardedRef}>
//       <Select.ItemText>{children}</Select.ItemText>
//       <StyledItemIndicator>
//         <CheckIcon />
//       </StyledItemIndicator>
//     </StyledItem>
//   )
// })
export const Item = ({ children, ...props }) => {
  return (
    // @ts-expect-error
    <StyledItem {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  )
}

export const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
})

export const Label = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
})

export const Separator = styled(Select.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
})

export const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: violet.violet11,
  cursor: 'default',
}

export const SelectScrollUpButton = styled(
  Select.ScrollUpButton,
  scrollButtonStyles,
)

export const SelectScrollDownButton = styled(
  Select.ScrollDownButton,
  scrollButtonStyles,
)
