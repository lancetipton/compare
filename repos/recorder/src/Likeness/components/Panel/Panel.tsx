import type { UI } from '../../UI'
import type { TStoreActs, TElAttrs, TEElement } from '@lkns/simple'

import {
  PanelMain,
  PanelButton,
  PanelActions,
  PanelContainer,
  PanelRecordIcon,
} from './Panel.sx'

export type TPanel = TStoreActs & TElAttrs & {
  UI:UI
  panelCls?:string
  children?:TEElement
}

export const Panel = (props:TPanel) => {
  const {
    UI,
    state,
    dispatch,
    children,
    className,
    panelCls,
    ...rest
  } = props

  return PanelContainer({className: [`lk-panel-container`, className]},
    PanelMain({...rest, className: [`lk-panel`, props.panelCls] },
      PanelActions({className: `lk-actions`},
        PanelButton({
          buttonCls: `lk-record-action`,
          onclick: () => state.recording = !state.recording,
          Icon: PanelRecordIcon,
        }, state.recording ? `Stop` : `Record`)
      )
    )
  )
}

