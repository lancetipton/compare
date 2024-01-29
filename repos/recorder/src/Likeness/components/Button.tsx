import type { TElAttrs, TEElement } from '@lkns/simple'

import { cls } from '@keg-hub/jsutils/cls'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import {
  Div,
  Img,
  Button as Btn,
} from '@lkns/simple'


export type TButton = TElAttrs & {
  icon?:TElAttrs
  text?:TEElement
  className?:string
  buttonCls?:string
  children?:TEElement|TEElement[]
}

const Icon = (props:TElAttrs=emptyObj) => {
  return Div({className: `lk-btn-icon-container`}, Img({
    ...props,
    className: [`lk-btn-icon`, props.className as string]
  }))
}

export const Button = (props:TButton=emptyObj, ...kids:TEElement[]) => {
  const {
    icon,
    text,
    className,
    buttonCls,
    children=kids,
    ...rest
  } = props

  return Div({className: [`lk-btn-container`, className]},
    Btn({...rest, className: [`lk-btn`, buttonCls]},
      icon && icon?.src && Icon(icon),
      text && Div({className: `lk-btn-text-container`}, text),
      children
    )
  )
}