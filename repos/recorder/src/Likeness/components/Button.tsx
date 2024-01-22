import type { TElement, TElAttrs, TEElement } from './Elements'

import { Elements } from './Elements'
import { cls } from '@keg-hub/jsutils/cls'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

const { Div, Button:Btn, Img } = Elements

export type TButton = TElAttrs & {
  icon?:TElAttrs
  text?:TEElement
  className?:string
  buttonCls?:string
  children?:TEElement|TEElement[]
}

const Icon = (props:TElAttrs=emptyObj) => {
  return Div({className: cls(`lk-btn-icon-container`)}, Img({
    ...props,
    className: cls(`lk-btn-icon`, props.className)
  }))
}

export const Button = (props:TButton=emptyObj, kids?:TEElement) => {
  const {
    icon,
    text,
    className,
    buttonCls,
    children=kids,
    ...rest
  } = props

  return Div({className: cls(`lk-btn-container`, className)},
    Btn({...rest, className: cls(`lk-btn`, buttonCls)},
      icon && icon?.src && Icon(icon),
      text && Div({className: cls(`lk-btn-text-container`)}, text),
      children
    )
  )
}