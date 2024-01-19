import { record } from 'rrweb'
import { exists } from '@keg-hub/jsutils/exists'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

export type TRecOpts = Parameters<typeof record>[0]
export type TEmitCB = (evt:any, checkout?:boolean) => Promise<void>|void

export type TRecorderOpts = {
  onEmit?:TEmitCB
  record?:TRecOpts
  autoStart?:boolean
  autoClean?:boolean
}

export class Recorder {

  onEmit:TEmitCB[]=[]
  autoClean?:boolean=true
  autoStart?:boolean=false
  options?:TRecOpts=emptyObj
  #stop:ReturnType<typeof record>

  constructor(opts:TRecorderOpts=emptyObj) {
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

  listen = (onEmit:TEmitCB) => {
    onEmit && this.onEmit.push(onEmit)
  }

  #emit:TEmitCB = (evt, checkout) => {
    Promise.all(this.onEmit.map(async cb => cb(evt, checkout)))
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
  
}