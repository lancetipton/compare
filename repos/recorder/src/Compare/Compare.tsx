import type { CPAR } from '@CPAR/CPAR'

import { UI } from './UI'

export type TCompareOpts = {
  element?:HTMLElement|string
}



export class Compare {
  cpar:CPAR
  ui:UI

  constructor(opts:TCompareOpts, cpar:CPAR){
    this.ui = new UI({
      root: opts.element
    })

    this.cpar = cpar
  }


  clean = () => {
    // @ts-ignore
    this.element = undefined
    this.cpar?.clean?.()
    // @ts-ignore
    this.cpar = undefined
  }

}