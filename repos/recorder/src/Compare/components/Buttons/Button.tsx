import type { TElFun, TElAttrs, TEElement } from '@cpar/simple'

import {
  ButtonMain,
  ButtonContainer,
} from './Button.sx'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import {
  Div,
  Img,
} from '@cpar/simple'

export type TButton = TElAttrs & {
  Icon?:TElFun
  icon?:TElAttrs
  text?:TEElement
  buttonCls?:string
}

const IconImg = (props:TElAttrs=emptyObj) => {
  return Div({className: `lk-btn-icon-container`}, Img({
    ...props,
    className: [`lk-btn-icon`, props.className as string]
  }))
}

export const Button:TElFun<TButton> = (props=emptyObj, ...kids) => {
  const {
    icon,
    text,
    Icon,
    className,
    buttonCls,
    children,
    ...rest
  } = props

  return ButtonContainer({className: [`lk-btn-container`, className]},
    ButtonMain({...rest, className: [`lk-btn`, buttonCls]},
      icon && icon.src && IconImg(icon),
      Icon && Icon(icon),
      text && Div({className: `lk-btn-text-container`}, text),
      children,
      ...kids,
    )
  )
}