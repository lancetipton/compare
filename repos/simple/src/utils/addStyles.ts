import type {
  TElement,
  TAttrObj,
} from '../types'


/**
 * Adds styles property to the element based on passed in styles object
 * @param el - dom node to add the styles to
 * @param styles - css styles in js in css format 
 * @return void
 */
export const addStyles = (el:TElement, styles:TAttrObj) => (
  !styles 
    ? el.removeAttribute(`styles`)
    : Object
      .keys(styles)
      .map(styleName => (
        styleName in el.style
          ? (el.style[styleName as any] = styles[styleName] as string)
          : console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`)
      ))
)
