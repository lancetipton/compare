import type { record } from 'rrweb'

export type TRecOpts = Parameters<typeof record>[0]
export type TEmitCB = (evt:any, checkout?:boolean) => Promise<void>|void
