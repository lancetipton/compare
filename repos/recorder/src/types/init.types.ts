import type { TCPAROpts } from '@CPAR/CPAR'
import type { TCompareOpts } from '@CPAR/src/Compare'

export type TInitOpts = TCPAROpts & {
  compare?:TCompareOpts
}