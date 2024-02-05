import { sx } from '@lkns/simple'
import { Button } from '../Buttons'
import { Actions } from '../Actions'
import { RecordIcon } from '../Icons'


export const PanelContainer = sx.Div((props) => {
  const { theme } = props

  return `
    padding: ${theme.gutter.p.px};
    color: ${theme.colors.foreground};
    background-color: ${theme.colors.background};
  `
})

export const PanelMain = sx.Div`

`


export const PanelActions = sx(Actions)`
  
`


export const PanelButton = sx(Button)`
  display: flex;
  align-items: center; 
  justify-contents: center;
`

export const PanelRecordIcon = sx(RecordIcon)((props) => {
  const { theme } = props
  return `
    height: 15px;
    width: 15px;
    margin-right: ${theme.margin.qpx};
  `
})

