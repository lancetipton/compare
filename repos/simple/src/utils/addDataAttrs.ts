import type {
  TElement,
  TAttrObj,
} from '../types'


/**
 * Adds data atrributes to the passed in element
 * @param el - dom node to add the styles to
 * @param dataAttrs - object of data attributes to add to the element
 * @return void
 */
export const addDataAttrs = (el:TElement, dataAttrs:TAttrObj) => (
  Object
    .keys(dataAttrs)
    .map((dataAttr) => el.setAttribute(`data-${dataAttr}`, dataAttrs[dataAttr] as string))
)

