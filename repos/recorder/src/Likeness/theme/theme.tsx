import { dims } from './dims'
import { gutter } from './gutter'
import { colors } from './colors'


export const theme = {
  light: {
    dims,
    gutter,
    colors: colors.light,
    margin: gutter.margin,
    padding: gutter.padding,
  },
  dark: {
    dims,
    gutter,
    colors: colors.dark,
    margin: gutter.margin,
    padding: gutter.padding,
  }
}
