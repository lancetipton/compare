import {
  SVGElements,
  SVGNamespace,
} from '../constants/svg'


/**
 * Creates a dom node based on the type
 * @param type - type of dom node that should be created
 * @return - Dom node
 */
export const createElement = (type:string) => (
  SVGElements.includes(type)
    ? document.createElementNS(SVGNamespace, type)
    : document.createElement(type)
)
