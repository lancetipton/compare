import type { TPlayerOpts } from '@LKR/services/Player'
import type { TRecorderOpts } from '@LKR/services/Recorder'
import type {
  TRecOpts,
  TPlayEvts,
  TPlayOpts,
} from '@LKR/types'

import { later } from '@LKR/utils/helpers'
import { Player } from '@LKR/services/Player'
import { Recorder } from '@LKR/services/Recorder'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

export type TLKROpts = {
  player?:TPlayerOpts
  recorder?:TRecorderOpts
}

export class LKR {

  player:Player
  recorder:Recorder

  constructor(opts:TLKROpts=emptyObj as TLKROpts){
    this.player = new Player(opts.player)
    this.recorder = new Recorder(opts.recorder)
  }

  playing = () => this.player.playing()
  recording = () => this.recorder.recording()

  record = (opts?:TRecOpts) => {
    this.recorder?.start?.(opts)
  }

  play = (opts:TPlayOpts, evts:TPlayEvts=[]) => {
    this.player?.start?.(opts, evts)
  }

  stop = () => {
    this.player?.stop?.()
    this.recorder?.stop?.()
  }

  clean = later(() => {
    this.player?.clean?.()
    this.player = undefined as any
    this.recorder?.clean?.()
    this.recorder = undefined as any
  })

}
