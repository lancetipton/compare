import type { TElement, TElAttrs, TEElement } from './Elements'

import { Elements } from './Elements'
import { cls } from '@keg-hub/jsutils/cls'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

const { Div } = Elements

export type TPanel = TElAttrs & {
  panelCls?:string
  children?:TEElement
}

export const Panel = (props:TPanel=emptyObj, kids?:TEElement) => {
  const {
    children=kids,
    className,
    panelCls,
    ...rest
  } = props
  
  return Div({className: cls(`lk-panel-container`, className)},
    Div({
      ...rest,
      className: cls(`lk-panel`, props.panelCls)
    }, children)
  )
}