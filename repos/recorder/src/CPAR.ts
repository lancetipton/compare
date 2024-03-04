import type { TPlayerOpts } from '@CPAR/services/Player'
import type { TRecorderOpts } from '@CPAR/services/Recorder'
import type {
  TRecOpts,
  TPlayEvts,
  TPlayOpts,
} from '@CPAR/types'

import { later } from '@CPAR/utils/helpers'
import { Player } from '@CPAR/services/Player'
import { Recorder } from '@CPAR/services/Recorder'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'

export type TCPAROpts = {
  player?:TPlayerOpts
  recorder?:TRecorderOpts
}

export class CPAR {

  player:Player
  recorder:Recorder

  constructor(opts:TCPAROpts=emptyObj as TCPAROpts){
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
