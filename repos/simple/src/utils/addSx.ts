import type {
  TElSx,
  TElement,
  TAttrObj,
  TElAttrs,
} from '../types'

import { getTheme } from '../styles'
import { addStyles } from './addStyles'
import { ife } from '@keg-hub/jsutils/ife'
import { isStr } from '@keg-hub/jsutils/isStr'
import { isObj } from '@keg-hub/jsutils/isObj'
import { isArr } from '@keg-hub/jsutils/isArr'

export const addSx = (el:TElement, sx:TElSx, attrs:TElAttrs) => {
  isObj<TAttrObj>(sx)
    ? addStyles(el, sx)
    : isArr(sx)
      ? sx.forEach(item => addSx(el, item, attrs))
      : ife(() => {
          const existing = el.style.cssText
          const add = isStr(sx) ? sx : sx({ element:el, attrs, theme: getTheme() })
          el.style.cssText = `${existing}${add}`
        })
      
}