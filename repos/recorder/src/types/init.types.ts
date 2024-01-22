import type { TLKROpts } from '@LKR/LKR'
import type { TLikenessOpts } from '@LKR/src/Likeness'

export type TInitOpts = TLKROpts & {
  likeness?:TLikenessOpts
}