import type {
  TPlayEvts,
  TPlayOpts,
  TListenerName,
  TPlayListenCB,
  TPlayerListeners,
} from '@LKR/types'

import { Replayer } from 'rrweb'
import { later } from '@LKR/utils/helpers'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { emptyArr } from '@keg-hub/jsutils/emptyArr'
import { eitherArr } from '@keg-hub/jsutils/eitherArr'

export type TPlayerOpts = {
  play?:TPlayOpts
  events:TPlayEvts
  autoPlay?:boolean
  listeners?:TPlayerListeners
}

export class Player {

  #player?:Replayer
  #listeners:TPlayerListeners=emptyObj
  #events?:TPlayEvts=emptyArr as TPlayEvts
  options?:TPlayOpts=emptyObj as TPlayOpts

  constructor(opts:TPlayerOpts=emptyObj as TPlayerOpts){
    const {
      play,
      events,
      autoPlay,
      listeners,
    } = opts

    this.options = {...play}
    events && (this.#events = events)
    listeners && (this.#listeners = listeners)

    autoPlay && this.start()
  }

  playing = () => Boolean(this.#player)

  on = (name:TListenerName, cb:TPlayListenCB) => {
    const off = () => {
      this.#listeners[name] = this.#listeners[name].filter(func => func !== cb)
    }

    if(this.playing()) this.#player?.on?.(name, cb)
    else if(!this.#listeners[name]) this.#listeners[name] = [cb]
    else {
      const found = this.#listeners[name].find(func => func === cb)
      !found && this.#listeners[name].push(cb)
    }

    return off
  }


  start = (opts?:TPlayOpts, evts?:TPlayEvts) => {
    if(this.playing()) return false

    // Build the player
    this.#player = new Replayer([
      ...eitherArr<TPlayEvts>(this.#events, emptyArr),
      ...eitherArr<TPlayEvts>(evts, emptyArr)
    ], {...opts, ...this.options})

    // Add event listeners
    Object.entries(this.#listeners)
      .forEach(([name, cbs]) => cbs.forEach(cb => this.#player?.on?.(name, cb)))

    // Start playing
    this.#player.play()
  }

  pause = (time?:number) => {
    if(this.playing()) return false

    this.#player?.pause?.(time)
    return true
  }

  play = (time?:number) => {
    // If no player, we can not resume playing
    if(!this.playing()) return false

    this.#player?.play?.(time)
    return true
  }

  stop = () => {
    this.#player?.destroy?.()
    this.#player = undefined
  }

  clean = later(() => {
    this.stop()
    this.#events = emptyArr
    this.#listeners = emptyObj
  })

}