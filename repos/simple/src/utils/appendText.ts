import type { TElement } from '../types'


/**
 * Adds text to the passed in parent element
 * @param el - element to add text to
 * @param text - text to add to the element
 * @return void
 */
export const appendText = (el:TElement, text:string|false) => (
  el && (text || text === false) &&
    el.appendChild(document.createTextNode(text as string))
)
