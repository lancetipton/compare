import type {
  TUIOpts,
  TUIState
} from '@LKR/types'


import { Div } from '@lkns/simple'
import { Panel } from './components/Panel'
import { Button } from './components/Button'

import { isStr } from '@keg-hub/jsutils/isStr'
import { exists } from '@keg-hub/jsutils/exists'

const UIState:TUIState = {
  playing: false,
  recording: false,
}

const getRootElement = (el?:HTMLElement|string) => {
  if(!exists(el)) return document.body
  if(!isStr(el)) return el as HTMLElement

  return document.querySelector(el) as HTMLElement
}

export class UI {
  
  root:HTMLElement
  panel:HTMLElement
  state:Record<string, any>={...UIState}

  constructor(opts:TUIOpts){
    this.root = getRootElement(opts.root)
    if(!this.root) throw new Error(`A valid HTML element or CSS selector is required!`)

    this.panel = document.createElement('div')
    this.state = {...this.state, ...opts?.state}

    this.#buildUI(opts)
  }

  #buildUI = (opts:TUIOpts) => {
    this.root.replaceChildren(Panel({ UI: this }))
  }

}