import type { TThemeTypeObj } from './theme.types'


type TClasTypes = {
  class?: string
    | string[]
    | Record<string, any>
    | Record<string, any>[]
    | Array<string|boolean|Boolean>
    | Array<string|boolean|Boolean>[]
    | Boolean
    | Boolean[]
    | boolean
    | boolean[]
    | unknown
    | unknown[]
    
  className?: string
    | string[]
    | Record<string, any>
    | Record<string, any>[]
    | Array<string|boolean|Boolean>
    | Array<string|boolean|Boolean>[]
    | Boolean
    | Boolean[]
    | boolean
    | boolean[]
    | unknown
    | unknown[]
}
  


export type TAttrObj = Record<string, string|number>
export type TElAttrStr = string
export type TAttrOpt = TElAttrs|TElAttrStr|typeof Element
export type TChildEls = TEElement|TEElement[]
export type TOnCB = (evt:any) => void

export type TElProps = Record<string, any>
export type TElAttrs<T extends TElProps=TElProps> = (T & TClasTypes & {
  id?:string
  src?:string
  alt?:string
  style?:TAttrObj
  dataset?:TAttrObj
  sx?:TElSx
  __sx__?:TElSxType[]
  children?:TChildEls
  [key:string]:unknown
})


export type TElement = SVGElement|HTMLElement
export type TEElement = TElFun|TElement|string|undefined|null
export type TElFun<T extends TElProps=TElProps> = (attrs?:TElAttrs<T>, ...children:TChildEls[]) => TElement

export type TSxCtx = {
  attrs:TElAttrs
  element:TElement
  theme:TThemeTypeObj
}
export type TElSxType = string|TAttrObj|((props:TSxCtx) => string)
export type TElSx = TElSxType|TElSxType[]