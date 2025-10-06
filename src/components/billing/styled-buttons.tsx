import styled from 'styled-components'
import { Button } from '@/components/ui/button'
import { plum, gray } from '@radix-ui/colors'

const theme = {
  colors: {
    ...plum,
    ...gray
  }
}

export const UpgradeButton = styled(Button)`
  &:hover {
    background-color: ${theme.colors.plum4} !important;
    color: ${theme.colors.plum12} !important;
  }
`

export const ExportButton = styled(Button)`
  &:hover {
    background-color: ${theme.colors.gray4} !important;
    color: ${theme.colors.gray12} !important;
  }
`

export { theme }

