import type {
  TThemes,
  TThemeObj,
  TRegThemeOpts,
  TThemeChangeCB
} from '../types'


import { EThemeType } from '../types'
import { isStr } from '@keg-hub/jsutils/isStr'
import { exists } from '@keg-hub/jsutils/exists'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { DefThemeName, DefThemeType } from '../constants'

type TRegTheme = Omit<TThemeObj, `name`> & { name?:string }

let __ActiveTheme = DefThemeName

const emptyTheme:TRegTheme = {
  light: {},
  dark: {},
}

let __Themes:TThemes = {
  [DefThemeName]: {...emptyTheme, name: DefThemeName }
}
let __ThemeType:EThemeType = DefThemeType
let __ThemeChangeEvts:TThemeChangeCB[] = []


export const onThemeChangeEvt = (cb:TThemeChangeCB) => {
  !__ThemeChangeEvts.includes(cb) && __ThemeChangeEvts.push(cb)

  return () => cb && offThemeChangeEvt(cb)
}

export const offThemeChangeEvt = (cb:TThemeChangeCB) => {
  __ThemeChangeEvts = __ThemeChangeEvts.filter(reg => reg !== cb)
}

const themeChangeEvt = () => {
  __ThemeChangeEvts.forEach(cb => cb(__Themes[__ActiveTheme][__ThemeType], __ThemeType, __ActiveTheme))
}

export const setThemeType = (type:EThemeType) => {
  if(!type || type === __ThemeType) return

  __ThemeType = type
  themeChangeEvt()
}

export const getThemeType = () => __ThemeType

export const getFullTheme = (name?:keyof typeof __Themes) => __Themes[name || __ActiveTheme]
export const getTheme = (name?:keyof typeof __Themes) => __Themes?.[name || __ActiveTheme]?.[__ThemeType] || {}

export const setTheme = (name:keyof typeof __Themes, type?:EThemeType) => {
  if(!name) return console.warn(`A theme name is required to set a theme`)
  const theme = __Themes[name]
  if(!theme) return console.warn(`Theme ${name} must be registered before it can be set active`)

  __ActiveTheme = name
  type && setThemeType(type)

  themeChangeEvt()
}


export const registerTheme = (
  theme:TRegTheme,
  opts?:string|TRegThemeOpts,
  setActive?:boolean,
  type?:EThemeType
) => {

  const options = isStr(opts) ? { name: opts, setActive, type } : opts || {}
  options.setActive = exists(setActive) ? setActive : options.setActive || true
  options.type = exists(type) ? type : options.type || EThemeType.light

  const themeName = (options.name || theme?.name || DefThemeName) as keyof typeof __Themes

  themeName === DefThemeName
    ? (__Themes[DefThemeName] = deepMerge(__Themes[DefThemeName], theme))
    : (__Themes[themeName] = {...emptyTheme, ...theme, name: themeName })

  options.onChange && onThemeChangeEvt(options.onChange)

  if(!setActive) return

  setTheme(themeName, options.type)

  return () => options.onChange && offThemeChangeEvt(options.onChange)

}

export const Theme = new Proxy(__Themes, {
  get(target, prop) {
    if(prop === EThemeType.light || prop === EThemeType.dark || prop === `name`)
      return target[__ActiveTheme][prop as EThemeType]

    return target[__ActiveTheme][__ThemeType][prop as string]
  },
  set(target, prop, value) {
    return false
  },
})
