import type { TInitOpts } from '@LKR/types'

import { LKR } from '@LKR/LKR'
import { ife } from '@keg-hub/jsutils/ife'
import { getTop } from '@LKR/utils/getTop'
import { Likeness } from '@LKR/src/Likeness'
import { LKR_OPTS_KEY } from '@LKR/constants'
import { storage } from '@LKR/services/Storage'
import { resolveUI } from '@LKR/utils/resolveUI'
import { emptyObj } from '@keg-hub/jsutils/emptyObj'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'

const top = getTop()
const { promise, resolve, reject, clean } = resolveUI()
top.Likeness = promise

const getOptions = () => {
  const passed = (top?.[LKR_OPTS_KEY] ?? emptyObj) as TInitOpts
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



