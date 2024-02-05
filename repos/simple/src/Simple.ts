import type {
  TElSx,
  TElFun,
  TElAttrs,
  TElement,
  TAttrObj,
  TAttrOpt,
  TChildEls,
  TElAttrStr,
} from './types'

import {
  AttrTypes,
  ElementNames,
  AttrExceptions,
} from './constants/elements'


import { isArr } from '@keg-hub/jsutils/isArr'
import { isFunc } from '@keg-hub/jsutils/isFunc'
import { exists } from '@keg-hub/jsutils/exists'
import { checkCall } from '@keg-hub/jsutils/checkCall'

import { addSx } from './utils/addSx'
import { strMatch } from './utils/strMatch'
import { addStyles } from './utils/addStyles'
import { appendText } from './utils/appendText'
import { appendArray } from './utils/appendArray'
import { addDataAttrs } from './utils/addDataAttrs'
import { addClassNames } from './utils/addClassNames'
import { createElement } from './utils/createElement'


/**
 * Maps passed in element properties to the passed in element
 * @param el - dom node to add the properties to
 * @param attrs - properties to add to the element
 *
 * @return void
 */
const mapProps = (el:TElement, attrs:TElAttrs) => (
  Object
    .keys(attrs)
    .map(attr => {
      const value = attrs[attr]
      let custom = false
      if(!exists(value)) return

      if(strMatch(attr, `for`)) attr = `htmlFor`
      if(strMatch(attr, `class`)) attr = `className`
      if(attr.startsWith(`data-`)) custom = true
      if(attr.startsWith(`on`)) attr = attr.toLowerCase()

      if (!custom && !(attr in el) && !AttrExceptions.includes(attr))
        return null

      switch(attr){
        case `sx`:
        case `__sx__`:
          return addSx(el, value as string|TAttrObj, attrs)
        case `style`:
          return addStyles(el, value as TAttrObj)
        case `dataset`:
          return addDataAttrs(el, value as TAttrObj)
        case `htmlFor`:
          // @ts-ignore
          return (el[attr] = value)
        case `className`:
          return addClassNames(el, attr, value as string)
        default:
          return custom
            ? el.setAttribute(attr, value as string)
            : isFunc(value) && attr.indexOf(`on`) === 0
              // @ts-ignore
              ? (el[attr.toLowerCase()] = value)
              : value && el.setAttribute(attr, value as string)
      }
    })
)


/**
 * Checks the passed in props, and adds them to the element base on the passed in propType
 * @param el - dom node to add the properties to
 * @param attrs - data that should be added to the element
 * @param attrsType - type of prop to make
 *
 * @return void
 */
const makeAttrs = (
  el:TElement,
  attrs?:TAttrOpt,
  attrsType?:string
) => (
  strMatch(attrsType, [`string`, `number`])
    ? appendText(el, attrs as TElAttrStr)
    : isArr(attrs)
      ? appendArray(el, attrs)
      : attrs instanceof window.Element
        ? el.appendChild(attrs)
        : mapProps(el, attrs as TElAttrs)
)


const E = (
  type:string,
  attrs?:TElAttrs,
  ...children:TChildEls[]
) => {
  const el = createElement(type)
  if(type === `script`) return el

  const attrsType = typeof attrs
  if(AttrTypes.includes(attrsType)){
    let props = attrs
    
    checkCall(strMatch(attrsType, `object`) && (() => {
      const {children:kids, ...rest} = (attrs as TElAttrs)
      props = rest
      Array.isArray(kids) ? children.push(...kids) : exists(kids) && children.push(kids)
    }) as any)

    makeAttrs(el, props, attrsType)
  }
  

  children && appendArray(el, children)

  return el
}

const Elements = ElementNames.reduce((els, type) => {
  els[type] = (attrs={}, ...args) => E(type.toLowerCase(), attrs, ...args)

  return els
}, {} as Record<string, TElFun>)

export {
  E,
  Elements,
}