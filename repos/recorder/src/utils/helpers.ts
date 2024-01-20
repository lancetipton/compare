import { tri } from '@keg-hub/jsutils/tri'

export const later = <T=unknown>(cb:(...args:any) => any, ...args:any[]):() => T => {
  return () => tri(cb, ...args)
}
