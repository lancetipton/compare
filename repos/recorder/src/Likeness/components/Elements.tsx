type TAttrObj = Record<string, string|number>
type TElAttrStr = string
type TAttrOpt = TElAttrs|TElAttrStr|typeof Element
type TChildEls = Array<TEElement|TEElement[]>
type TOnCB = (evt:any) => void

export type TElAttrs = {
  id?:string
  src?:string
  alt?:string
  style?:TAttrObj
  dataset?:TAttrObj
  class?:string|string[]
  className?:string|string[]
  children?:TChildEls|TEElement
  [key:string]:string|number|undefined|null|TAttrObj|string[]|TChildEls|TEElement|TOnCB
}


export type TElement = SVGElement|HTMLElement
export type TEElement = TElFun|TElement|string|undefined|null
export type TElFun = (attrs?:TElAttrs, ...children:TChildEls) => TElement

const AttrExceptions = [
  `role`,
  `dataset`,
  `d`,
  `r`,
  `cx`,
  `cy`,
  `width`,
  `height`,
  `viewBox`,
  `fill`,
]
const SVGNamespace = `http://www.w3.org/2000/svg`
const AttrTypes = [`string`, `number`, `object`]
const NoElTypes = [`string`, `number`, `boolean`]
const ClassNameTypes = [ `string`, `object` ]
const ElementNames = [
  `A`,
  `Abbr`,
  `Address`,
  `Article`,
  `Area`,
  `Audio`,
  `Aside`,
  `B`,
  `Bdi`,
  `Bdo`,
  `Blockquote`,
  `Br`,
  `Button`,
  `Canvas`,
  `Circle`,
  `Cite`,
  `Code`,
  `Data`,
  `Datalist`,
  `Dd`,
  `Details`,
  `Dialog`,
  `Dl`,
  `Dt`,
  `Div`,
  `Em`,
  `Embed`,
  `Fieldset`,
  `Footer`,
  `Form`,
  `H1`,
  `H2`,
  `H3`,
  `H4`,
  `H5`,
  `H6`,
  `Header`,
  `Hgroup`,
  `Hr`,
  `I`,
  `Iframe`,
  `Img`,
  `Input`,
  `Kbd`,
  `Label`,
  `Legend`,
  `Link`,
  `Li`,
  `Main`,
  `Map`,
  `Math`,
  `Menu`,
  `Meter`,
  `Nav`,
  `Noscript`,
  `Object`,
  `Ol`,
  `Option`,
  `Optgroup`,
  `Output`,
  `P`,
  `Path`,
  `Picture`,
  `Portal`,
  `Pre`,
  `Progress`,
  `Q`,
  `S`,
  `Script`,
  `Section`,
  `Search`,
  `Select`,
  `Slot`,
  `Small`,
  `Source`,
  `Span`,
  `Strong`,
  `Style`,
  `Sub`,
  `Summary`,
  `Svg`,
  `Textarea`,
  `Table`,
  `Tbody`,
  `Td`,
  `Template`,
  `Tfoot`,
  `Thead`,
  `Tr`,
  `Track`,
  `U`,
  `Ul`,
  `Var`,
  `Video`,
  `Wbr`,
]

/**
 * Adds text to the passed in parent element
 * @param  {TElement} el - element to add text to
 * @param  {String} text - text to add to the element
 * @return { void }
 */
const appendText = (el:TElement, text:string|false) => (
  el && (text || text === false) &&
    el.appendChild(document.createTextNode(text as string))
)
  
/**
 * Loops the passed in array and adds them to the passed in el based on the type
 * @param  {TElement} el - dom node to add the array of children to
 * @param  {TElement[]} children - group of element or text to add to the passed in element
 * @return { void }
 */
const appendArray = (el:TElement, children:TChildEls):unknown => (
  children
    .map((child) => (
      Array.isArray(child)
        ? appendArray(el, child)
        : child instanceof window.Element
          ? el.appendChild(child)
          : NoElTypes.includes(typeof child)
            ? appendText(el, child as string)
            : typeof child === `function`
              ? child()
              : null
    ))
)

/**
 * Adds styles property to the element based on passed in styles object
 * @param  {TElement} el - dom node to add the styles to
 * @param  { object } styles - css styles in js in css format 
 * @return { void }
 */
const setStyles = (el:TElement, styles:TAttrObj) => (
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

/**
 * Adds data atrributes to the passed in element
 * @param  {TElement} el - dom node to add the styles to
 * @param  { object } dataAttrs - object of data attributes to add to the element
 * @return { void }
 */
const setDataAttributes = (el:TElement, dataAttrs:TAttrObj) => (
  Object
    .keys(dataAttrs)
    .map((dataAttr) => el.setAttribute(`data-${dataAttr}`, dataAttrs[dataAttr] as string))
)


const addList = (list:string, name:string) => list.indexOf(` ${name} `) === -1 && (list += ` ${name} `)

/**
 * Adds classes to the element, based on the value of the className prop 
 * @param  {TElement} el - dom node to add the properties to
 * @param  {string} prop - name of prop should always be className
 * @param  {string|string[]} value - classes to add to the element
 * @return { void }
 */
const buildClassName = (el:TElement, prop:string, value:string|string[]) => {
  const valueType = typeof value
  if(prop !== `className` || ClassNameTypes.indexOf(valueType) === -1)
    return el

  // @ts-ignore
  if(valueType === `string`) return (el[prop] = value)

  Array.isArray(value) && (
    value.reduce((list, name, index) => {
      if(typeof name === `string`) addList(list, name)
      else if (Array.isArray(name))
        (name as string[]).map((subName) => ( addList(list, subName) ) )

      return index === value.length -1
        // @ts-ignore
        ? (el[prop] = list.trim())
        : list
    }, ``)
  )
}

/**
 * Maps passed in element properties to the passed in element
 * @param  {TElement} el - dom node to add the properties to
 * @param  {TElAttrs} attrs - properties to add to the element
 * @return { void }
 */
const mapProps = (el:TElement, attrs:TElAttrs) => (
  Object
    .keys(attrs)
    .map(attr => {
      const value = attrs[attr]
      let custom = false
      if(attrs[attr] === undefined || attrs[attr] === null) return

      if(attr === `for`) attr = `htmlFor`
      if(attr === `class`) attr = `className`
      if(attr.indexOf(`data-`) === 0) custom = true
      if(attr.indexOf(`on`) === 0) attr = attr.toLowerCase()
      
      
      if (!custom && !(attr in el) && !AttrExceptions.includes(attr))
        return null

      switch(attr){
        case `style`:
          return setStyles(el, value as TAttrObj)
        case `dataset`:
          return setDataAttributes(el, value as TAttrObj)
        case `htmlFor`:
          // @ts-ignore
          return (el[attr] = value)
        case `className`:
          return buildClassName(el, attr, value as string)
        default:
          return custom
            ? el.setAttribute(attr, value as string)
            : typeof value === `function` && attr.indexOf(`on`) === 0
              // @ts-ignore
              ? (el[attr] = value)
              : value && el.setAttribute(attr, value as string)
      }
    })
)

/**
 * Checks if the passed in type should be svg
 * @param  {String} type - to be checked
 * @return {Boolean}
 */
const isSvg = (type:string) => ([`path`, `svg`, `circle`].includes(type))

/**
 * Checks the passed in props, and adds them to the element base on the passed in propType
  * @param  {TElement} el - dom node to add the properties to
 * @param  { any } props - data that should be added to the element
 * @param  {String} propsType - type of prop to make
 * @return {void}
 */
const makeAttrs = (
  el:TElement,
  attrs?:TAttrOpt,
  attrsType?:string
) => (
  attrsType === `string` || attrsType === `number`
    ? appendText(el, attrs as TElAttrStr)
    : Array.isArray(attrs)
      ? appendArray(el, attrs)
      : attrs instanceof window.Element
        ? el.appendChild(attrs)
        : mapProps(el, attrs as TElAttrs)
)

/**
 * Creates a dom node based on the type
 * @param  {String} type - type of dom node that should be created
 * @return {HTMLElement} - created dom node
 */
const makeEl = (type:string) => (
  isSvg(type)
    ? document.createElementNS(SVGNamespace, type)
    : document.createElement(type)
)

const E = (
  type:string,
  attrs?:TElAttrs,
  ...children:TChildEls
) => {
  const el = makeEl(type)
  if(type === `script`) return el

  const attrsType = typeof attrs
  if(AttrTypes.includes(attrsType)){
    let props = attrs
    if(attrsType === `object`){
      const {children:kids, ...rest} = (attrs as TElAttrs)
      props = rest
      Array.isArray(kids) ? children.push(...kids) : children.push(kids)
    }
    makeAttrs(el, props, attrsType)
  }

  children && appendArray(el, children)

  return el
}

const Elements = ElementNames.reduce((els, type) => (
  (els[type] = (attrs, ...args) => E(type.toLowerCase(), attrs, ...args)) && els
), {} as Record<string, TElFun>)

export {
  E,
  Elements,
}