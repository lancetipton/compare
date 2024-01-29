import { ensureArr } from '@keg-hub/jsutils/ensureArr'


/**
 * Check if first argument string matches the second argument string
 */
export const strMatch = (str:string|undefined, match:string|string[]) => {
  if(!str) return false

  const check = ensureArr<string>(match)
  const trim = str.trim()

  return check.find(item => trim.trim() === item.trim())
}