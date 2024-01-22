import type { LKR } from '@LKR/LKR'

import { UI } from './UI'

export type TLikenessOpts = {
  element?:HTMLElement|string
}



export class Likeness {
  lkr:LKR
  ui:UI

  constructor(opts:TLikenessOpts, lkr:LKR){
    this.ui = new UI({
      root: opts.element
    })

    this.lkr = lkr
  }


  clean = () => {
    // @ts-ignore
    this.element = undefined
    this.lkr?.clean?.()
    // @ts-ignore
    this.lkr = undefined
  }

}