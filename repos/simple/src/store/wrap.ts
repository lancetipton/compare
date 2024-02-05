import {
  TWrapCB,
  TElAttrs,
  TChildEls,
  TComponent,
  TOnMutation,
} from "../types"

type TMutWithParent = MutationObserver & { __parent:SVGElement|HTMLElement|ParentNode|undefined }

const onObserve = (el:Node, callback:TOnMutation, parent=el.parentNode) => {
  if(!parent)
    return console.log(`Can not watch Element, no parent node found`, el)

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.type === `childList`
        && mutation.removedNodes.length > 0
        && mutation.removedNodes[0] === el
        && callback()
    })
  }) as TMutWithParent

  observer.observe(parent, { childList: true })
  observer.__parent = parent

  return observer
}

export const wrap = (
  cb:TWrapCB,
  Component:TComponent,
  exProps:TElAttrs={}
) => {
  let observer:TMutWithParent|undefined
  let El:SVGElement|HTMLElement|undefined

  return (props:TElAttrs={}, ...rest:TChildEls[]) => {
    // Initial element render
    El = Component({...props, ...exProps}, ...rest)

    // Add hook to watch for changes to the above element being replaced
    requestAnimationFrame(() => {
      // This call should register a watcher in the parent caller
      // The watcher should rerender the component, and call the callback passing it in
      // So that it can be replaced in the dom
      cb?.(props, rest, (Replaced:SVGElement|HTMLElement, onMutation?:TOnMutation) => {
        const parent = El?.parentNode
        if(Replaced !== El){
          El?.replaceWith(Replaced)
          El = undefined
          El = Replaced
        }

        if(observer?.__parent === parent) return

        if(observer){
          observer.__parent = undefined
          observer?.disconnect?.()
        }

        const observing = onObserve(Replaced, () => onMutation?.(), parent)
        observer = observing ? observing : undefined

      })
    })

    return El
  }
}