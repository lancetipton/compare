import type {
  TElFun,
  TThemeObj,
  TComponent,
} from '../types'

import { createStore } from '../store'
import { DefThemeName, DefThemeType } from '../constants'
import {
  getTheme,
  getThemeType,
  setThemeType,
  getFullTheme,
  registerTheme
} from './theme'


const ThemeState = {
  type: DefThemeType,
  name: DefThemeName,
  theme: getFullTheme(DefThemeName)
}

const {
  state,
  watch,
} = createStore(ThemeState)


export type TThemeProps = Omit<Partial<typeof ThemeState>, `theme`> & {
  theme: Omit<TThemeObj, `name`> & { name?:string }
}

export const ThemeProvider = (Component:TComponent, props:TThemeProps) => {
  const {
    type,
    theme,
  } = props

  if(type && state.type !== type){
    state.type = type
    setThemeType(type)
  }

  if(theme && state.theme !== theme){
    registerTheme(theme, {
      setActive: true,
      type: state.type,
      name: state.theme.name,
      onChange: (theme, themeType, themeName) => {
        const fullTheme = getFullTheme()
        state.theme !== fullTheme
          && (state.theme = fullTheme)
      },
    })

    state.theme = theme
  }

  const ThemeWrapper:TElFun = watch((props={}, ...rest:any[]) => {
    return Component({
      ...props,
      theme: getTheme(),
      themeType: getThemeType(),
    }, ...rest)
  })

  return ThemeWrapper
}
