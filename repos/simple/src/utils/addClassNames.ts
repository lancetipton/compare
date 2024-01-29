import type { TClsItems } from '@keg-hub/jsutils/cls'
import type {
  TElement,
} from '../types'

import { cls } from '@keg-hub/jsutils/cls'

/**
 * Adds classes to the element, based on the value of the className prop 
 * @param el - dom node to add the properties to
 * @param prop - name of prop should always be className
 * @param value - classes to add to the element
 * @return void
 */
export const addClassNames = (el:TElement, prop:string, value:TClsItems) => {
  (prop === `className` || prop === `class`)
    && el.setAttribute(`className`, cls(value))
}
