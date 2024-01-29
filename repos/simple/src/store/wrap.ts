import {TState, TStoreActs, TComponent} from "../types"

const onObserve = (el:Node, callback:any, parent=el.parentNode) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      console.log(mutation)
      
      mutation.type === `childList`
        && mutation.removedNodes.length > 0
        && mutation.removedNodes[0] === el
        && callback()
    })
  }
  )

  parent
    ? observer.observe(parent, { childList: true })
    : console.log(`Can not watch Element, no parent node found`, el)

  return observer
}

export const wrap = <T extends TState=TState>(
  slice:TStoreActs<T>,
  Component:TComponent
) => {
  let observer:MutationObserver
  let El:SVGElement|HTMLElement|undefined

  return (props:Record<string, any>, ...rest:any[]) => {
    El = Component({...props, ...slice}, ...rest)

    requestAnimationFrame(() => {
      slice.watch((updated) => {
        const parent = El?.parentNode
        const Replaced = Component({...props, ...slice, state: updated}, ...rest)
        El?.replaceWith(Replaced)
        El = undefined
        El = Replaced
        observer?.disconnect?.()
        observer = onObserve(Replaced, () => slice.forget(), parent)
      })
    })

    return El
  }

}