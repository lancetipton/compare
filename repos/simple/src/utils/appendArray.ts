import type {
  TElement,
  TChildEls,
} from '../types'

import { NoElTypes } from '../constants/elements'

import { appendText } from './appendText'
import { ife } from '@keg-hub/jsutils/ife'
import { isArr } from '@keg-hub/jsutils/isArr'
import { isFunc } from '@keg-hub/jsutils/isFunc'
import { ensureArr } from '@keg-hub/jsutils/ensureArr'


/**
 * Loops the passed in array and adds them to the passed in el based on the type
 * @param el - dom node to add the array of children to
 * @param children - group of element or text to add to the passed in element
 * @return void
 */
export const appendArray = (
  el:TElement,
  children:TChildEls[],
  props:Record<string, any>={}
):void => {
  children
    .map((child) => (
      isArr(child)
        ? appendArray(el, child, props)
        : child instanceof window.Element
          ? el.appendChild(child)
          : isFunc(child)
            ? ife(() => appendArray(el, ensureArr(child({ $parent:el, ...props })), props))
            : NoElTypes.includes(typeof child)
              ? appendText(el, child as string)
              : null
    ))
}
