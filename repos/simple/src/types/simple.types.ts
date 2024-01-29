import type { TClsItems } from '@keg-hub/jsutils/cls'

export type TAttrObj = Record<string, string|number>
export type TElAttrStr = string
export type TAttrOpt = TElAttrs|TElAttrStr|typeof Element
export type TChildEls = Array<TEElement|TEElement[]>
export type TOnCB = (evt:any) => void

export type TElAttrs = {
  id?:string
  src?:string
  alt?:string
  style?:TAttrObj
  dataset?:TAttrObj
  class?:TClsItems
  className?:TClsItems
  children?:TChildEls|TEElement
  [key:string]:string
    | null
    | TOnCB
    | number
    | boolean
    | Boolean
    | string[]
    | TAttrObj
    | undefined
    | TChildEls
    | TEElement
    | TClsItems
}


export type TElement = SVGElement|HTMLElement
export type TEElement = TElFun|TElement|string|undefined|null
export type TElFun = (attrs?:TElAttrs, ...children:TChildEls) => TElement
