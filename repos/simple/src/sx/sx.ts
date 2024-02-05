import type {
  TElSx,
  TElFun,
  TElAttrs,
  TElSxType,
  TElementsAll,
} from '../types'


import { Elements } from '../Simple'
import { DefSXKey } from '../constants'
import { isObj } from '@keg-hub/jsutils/isObj'
import { isStr } from '@keg-hub/jsutils/isStr'
import { isArr } from '@keg-hub/jsutils/isArr'
import { ensureArr } from '@keg-hub/jsutils/ensureArr'
import { capitalize } from '@keg-hub/jsutils/capitalize'

type TSXStyleFun = (styles:TElSx|TemplateStringsArray) => TElFun
type TSX = ((el:keyof TElementsAll|TElFun) => TSXStyleFun) & TElementsAll<TSXStyleFun>


/**
 * Helper to wrap elements and components to inject the sx prop
 * Follows a similar pattern to emotion, and mui
 */
export const sx = ((el:keyof TElementsAll|TElFun) => {
  const elFun = isStr(el) ? Elements[capitalize(el)] : el

  if(!elFun) throw new Error(`The sx prop requires an element type of element function`)

  return (styles:TElSx|TemplateStringsArray) => {
    if(isArr(styles) && styles.length === 1) styles = styles[0]

    return ((attrs:TElAttrs, ...args) => {

      // If attrs is not an object, then is must be a string, null, or undefined
      // In that case set the passed in attrs as children, so string will still be added
      const props = isObj<TElAttrs>(attrs) ? attrs : { children: attrs }
      props[DefSXKey] = (props[DefSXKey] || []) as TElSxType[]
      const first = props[DefSXKey][0]
      
      isStr(first) && isStr(styles)
        ? (props[DefSXKey][0] = `${first} ${styles}`)
        : props[DefSXKey].push(...ensureArr<TElSxType>(styles))

      // Set the internal __sx__ prop, so the styles will be applied to the element
      return elFun(props, ...args)
    }) as TElFun
  }
}) as TSX

Object.keys(Elements).forEach(name => {
  const key = name as keyof TElementsAll
  sx[key] = sx(key)
  sx[capitalize<keyof TElementsAll>(key)] = sx(key)
})
