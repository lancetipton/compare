
export enum EThemeType {
  dark=`dark`,
  light=`light`,
}

export type TThemeTypeObj = Record<string, any>

export type TThemeObj = {
  name:string
  dark:TThemeTypeObj,
  light:TThemeTypeObj,
}

export type TThemes = Record<string, TThemeObj>

export type TThemeChangeCB = (theme:TThemeTypeObj, type:EThemeType, name:keyof TThemes) => void

export type TRegThemeOpts = {
  name?:string
  type?:EThemeType
  setActive?:boolean
  onChange?:TThemeChangeCB
}