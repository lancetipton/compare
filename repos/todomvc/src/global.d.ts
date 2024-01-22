import type { Likeness, TInitOpts, LKNS_OPTS_KEY } from '@likeness/recorder'

declare global {
  interface Window {
    [LKNS_OPTS_KEY]: TInitOpts
    Likeness: Promise<typeof Likeness>
  }
}
