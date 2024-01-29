
export type TUIOpts = {
  state?:TUIState
  root?:HTMLElement|string
}

export type TUIState = {
  playing?:boolean
  recording?:boolean
}