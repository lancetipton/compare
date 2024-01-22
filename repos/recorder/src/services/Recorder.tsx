import type {
  TRecOpts,
  TRecEmitCB
} from '@LKR/types'

import { record } from 'rrweb'
import { later } from '@LKR/utils/helpers'
import { exists } from '@keg-hub/jsutils/exists'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

export type TRecorderOpts = {
  record?:TRecOpts
  onEmit?:TRecEmitCB
  autoStart?:boolean
  autoClean?:boolean
}

export class Recorder {

  onEmit:TRecEmitCB[]=[]
  autoClean?:boolean=true
  autoStart?:boolean=false
  #stop:ReturnType<typeof record>
  options?:TRecOpts=emptyObj as TRecOpts

  constructor(opts:TRecorderOpts=emptyObj as TRecorderOpts) {
    const {
      onEmit,
      record,
      autoStart,
      autoClean,
    } = opts

    onEmit && this.onEmit.push(onEmit)
    this.options = {...this.options, ...record}
    exists(autoStart) && (this.autoStart = autoStart)
    exists(autoClean) && (this.autoClean = autoClean)

  }

  recording = () => Boolean(this.#stop)

  listen = (onEmit:TRecEmitCB) => {
    onEmit && this.onEmit?.push?.(onEmit)
  }

  #emit:TRecEmitCB = (evt, checkout) => {
    Promise.all(this.onEmit?.map?.(async cb => cb(evt, checkout)))
  }

  start = (opts:TRecOpts=emptyObj) => {
    if(this.recording()) return false

    const {
      emit
    } = opts
    
    emit && this.onEmit.push(emit)

    const stop = record<any>({
      ...this.options,
      ...opts,
      emit: this.#emit
    })
    
    this.#stop = () => {
      if(this.autoClean && emit)
        this.onEmit = this.onEmit.filter(cb => cb !== emit)

      this.#stop = undefined
      return stop?.()
    }
  }

  stop = () => {
    this.#stop?.()
    this.#stop = undefined
  }

  clean = later(() => {
    this.stop()
    this.options = {}
    this.onEmit = []
  })

}