import type {
  TUIOpts,
  TUIState
} from '@LKR/types'

import { theme } from './theme'
import { ThemeProvider } from '@lkns/simple'
import { isStr } from '@keg-hub/jsutils/isStr'
import { exists } from '@keg-hub/jsutils/exists'
import { Panel } from './components/Panel/Panel'
import { State, Provider, Subscribe } from '@LKR/store/reducer'

const AppUI = ThemeProvider(Provider(Panel), {theme})


const getRootElement = (el?:HTMLElement|string) => {
  if(!exists(el)) return document.body
  if(!isStr(el)) return el as HTMLElement

  return document.querySelector(el) as HTMLElement
}

export class UI {

  root:HTMLElement
  state:Record<string, any>=State

  constructor(opts:TUIOpts){
    this.root = getRootElement(opts.root)
    if(!this.root) throw new Error(`A valid HTML element or CSS selector is required!`)

    // TODO check if shoudl update reducer state when opts.states value does not match current state
    // The reducer state is already init at this point, so it does not reflect what is in opts.state
    this.state = {...this.state, ...opts?.state}

    Subscribe(this.#updateState, `UI-State-Watcher`)
    this.#render()
  }

  #render = () => {
    this.root.replaceChildren(AppUI({ UI: this }))
  }

  #updateState = (update:any) => {
    this.state = {...this.state, ...update}
  }


}