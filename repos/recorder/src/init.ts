import type { TCPAROpts } from '@CPAR/CPAR'
import type { TCompareOpts } from '@CPAR/Compare'
import type { Player, TPlayerOpts } from '@CPAR/services/Player'
import type { Recorder, TRecorderOpts } from '@CPAR/services/Recorder'
import type {
  TInitOpts,
  TPlayEvt,
  TPlayEvts,
  TRecEmitCB,
  TPlayListenCB,
} from '@CPAR/types'


import { CPAR } from '@CPAR/CPAR'
import { ife } from '@keg-hub/jsutils/ife'
import { getTop } from '@CPAR/utils/getTop'
import { Compare } from '@CPAR/Compare'
import { CPAR_OPTS_KEY } from '@CPAR/constants'
import { storage } from '@CPAR/services/Storage'
import { resolveUI } from '@CPAR/utils/resolveUI'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'

const top = getTop()
const { promise, resolve, reject, clean } = resolveUI()
top.Compare = promise

const getOptions = () => {
  const passed = (top?.[CPAR_OPTS_KEY] ?? emptyObj) as TInitOpts
  const stored = (storage.getOptions() ?? emptyObj) as TInitOpts

  return {
    player: deepMerge(stored.player, passed.player),
    options: deepMerge(stored.compare, passed.compare),
    recorder: deepMerge(stored.recorder, passed.recorder),
  }
}

const onLoad = async () => {
  try {
    const { options, ...rest } = getOptions()
    const cpar = new CPAR(rest)
    const compare = new Compare(options, cpar)

    resolve?.(compare)
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
  Compare,
  TCPAROpts,
  TInitOpts,
  TPlayEvt,
  TPlayEvts,
  TRecEmitCB,
  TPlayerOpts,
  TPlayListenCB,
  TRecorderOpts,
  TCompareOpts,
}
export {
  CPAR_OPTS_KEY
} from '@CPAR/constants'