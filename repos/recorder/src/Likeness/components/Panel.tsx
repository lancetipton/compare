import type { UI } from '../UI'
import type { TStoreActs, TElAttrs, TEElement } from '@lkns/simple'

import { Button } from './Button'
import { Div } from '@lkns/simple'
import { cls } from '@keg-hub/jsutils/cls'
import { Watch } from '@LKR/store/reducer'

export type TPanel = TStoreActs & TElAttrs & {
  UI:UI
  panelCls?:string
  children?:TEElement
}

const PanelComp = (props:TPanel) => {
  const {
    UI,
    state,
    dispatch,
    children,
    className,
    panelCls,
    ...rest
  } = props

  const { recording } = state

  return Div({className: cls(`lk-panel-container`, className)},
    Div({...rest, className: [`lk-panel`, props.panelCls] },
      Div({className: `lk-actions-container`},
        Button({
          buttonCls: `lk-record-action`,
          onclick: () => dispatch({
            payload: !recording,
            type: `Set-Recording`,
          })
        }, recording ? `Stop` : `Record`)
      )
    )
  )
}

export const Panel = Watch(PanelComp)
// export const Panel = PanelComp