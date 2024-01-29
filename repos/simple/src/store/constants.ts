import { isArr } from '@keg-hub/jsutils/isArr'
import { isColl } from '@keg-hub/jsutils/isColl'

let _CONSTANTS = {}

const arr2Obj = (acts:string[]) => (
  acts.reduce((actions, action) => {
    actions[action.toUpperCase()] = action.toUpperCase()

    return actions
  }, {} as Record<string, string>)
)

const add = (items:string[]|Record<string, string>) => {
  if(!isColl(items))
    console.warn(`add method requires an object or array as it's only param`)

  _CONSTANTS = Object.freeze({
    ..._CONSTANTS,
    ...(isArr(items) ? arr2Obj(items) : items)
  })

  return _CONSTANTS
}

const get = () => _CONSTANTS

export default {
  add,
  get
}