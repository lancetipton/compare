import type { TElAttrs, TElement } from './components/Elements'

import { cls } from '@keg-hub/jsutils/cls'
import { Panel } from './components/Panel'
import { Button } from './components/Button'

import { isStr } from '@keg-hub/jsutils/isStr'
import { exists } from '@keg-hub/jsutils/exists'
import { Elements } from './components/Elements'
const { Div } = Elements

const getRootElement = (el?:HTMLElement|string) => {
  if(!exists(el)) return document.body
  if(!isStr(el)) return el as HTMLElement

  return document.querySelector(el) as HTMLElement
}

export type TUIOpts = {
  root?:HTMLElement|string
}

export class UI {
  
  root:HTMLElement
  panel:HTMLElement
  
  constructor(opts:TUIOpts){
    this.root = getRootElement(opts.root)
    if(!this.root) throw new Error(`A valid HTML element or CSS selector is required!`)

    this.panel = document.createElement('div')
    this.#buildUI(opts)
  }


  #buildUI = (opts:TUIOpts) => {
    this.root.appendChild(Panel({},
      Div({className: `lk-actions-container`},
        Button({
          buttonCls: `lk-record-action`,
          onclick: () => {
            console.log(`------- record click -------`)
          }
        }, `Record`)
      )
    ))
  }

  #buildRecord = () => {
    const recordButton = this.panel.appendChild(document.createElement('button'))
  }

  #buildStop = () => {
    const stopButton = this.panel.appendChild(document.createElement('button'))
    
  }

  #buildPlay = () => {
    const playButton = this.panel.appendChild(document.createElement('button'))
    
  }

  #buildPause = () => {
    const pauseButton = this.panel.appendChild(document.createElement('button'))
    
  }

}