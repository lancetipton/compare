import type { Replayer } from 'rrweb'

export type TPlayEvt = TPlayEvts[0]
export type TPlayEvts = ConstructorParameters<typeof Replayer>[0]
export type TPlayOpts = ConstructorParameters<typeof Replayer>[1]

export type TListenerName = Parameters<Replayer[`on`]>[0]
export type TPlayListenCB = Parameters<Replayer[`on`]>[1]
export type TPlayerListeners = Record<TListenerName, TPlayListenCB[]>