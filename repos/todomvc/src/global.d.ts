import type { Compare, TInitOpts, CPAR_OPTS_KEY } from '@compare/recorder'

declare global {
  interface Window {
    [CPAR_OPTS_KEY]: TInitOpts
    Compare: Promise<typeof Compare>
  }
}
