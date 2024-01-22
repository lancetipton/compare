import type { TLKROpts } from '@LKR/LKR'
import type { TLikenessOpts } from '@LKR/Likeness'
import type { Player, TPlayerOpts } from '@LKR/services/Player'
import type { Recorder, TRecorderOpts } from '@LKR/services/Recorder'
import type {
  TInitOpts,
  TPlayEvt,
  TPlayEvts,
  TRecEmitCB,
  TPlayListenCB,
} from '@LKR/types'


import { LKR } from '@LKR/LKR'
import { ife } from '@keg-hub/jsutils/ife'
import { getTop } from '@LKR/utils/getTop'
import { Likeness } from '@LKR/Likeness'
import { LKNS_OPTS_KEY } from '@LKR/constants'
import { storage } from '@LKR/services/Storage'
import { resolveUI } from '@LKR/utils/resolveUI'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'

const top = getTop()
const { promise, resolve, reject, clean } = resolveUI()
top.Likeness = promise

const getOptions = () => {
  const passed = (top?.[LKNS_OPTS_KEY] ?? emptyObj) as TInitOpts
  const stored = (storage.getOptions() ?? emptyObj) as TInitOpts

  return {
    player: deepMerge(stored.player, passed.player),
    options: deepMerge(stored.likeness, passed.likeness),
    recorder: deepMerge(stored.recorder, passed.recorder),
  }
}

const onLoad = async () => {
  try {
    const { options, ...rest } = getOptions()
    const lkr = new LKR(rest)
    const likeness = new Likeness(options, lkr)

    resolve?.(likeness)
  }
  catch(err){
    reject?.(err as Error)
  }
  finally {
    clean()
  }
}

ife(() => top.onload = onLoad)

export type {
  Player,
  Recorder,
  Likeness,
  TLKROpts,
  TInitOpts,
  TPlayEvt,
  TPlayEvts,
  TRecEmitCB,
  TPlayerOpts,
  TPlayListenCB,
  TRecorderOpts,
  TLikenessOpts,
}
export {
  LKNS_OPTS_KEY
} from '@LKR/constants'