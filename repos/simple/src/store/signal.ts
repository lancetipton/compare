import type {
  TComponent
} from '../types'

import { wrap } from './wrap'

type TSignalStoreState = Record<string, any>
type TRef = Record<`value`, any>
type TSubscriber<T=any> = <V extends T=T>(val:V) => any
type TSignal<T=any> = {
  value:T
  unmount: (() => any)|undefined
  subscribe: (cb:TSubscriber<T>, id?:any) => void,
}

type TSignalStore<T extends TSignalStoreState=TSignalStoreState> = {
  state:T
  unmount:(id?:any) => any
  update:(key:keyof T, val:any) => void
  watch: (Component:TComponent) =>  any
  subscribe:(cb:TSubscriber<T>, id?:any) => any,
}


export const createSignal = <T=any>(val:T):TSignal<T> => {

  let ref:TRef = { value: val }
  let subscribers:TSubscriber[] = []

  const notify = () => subscribers.map(sub => sub(ref.value))

  let sig = {
    get value(){ return ref.value as T },
    set value(val:T){
      ref.value = val
      notify()
    },
    subscribe: (subscriber:TSubscriber<T>) => {
      !subscribers.includes(subscriber)
        && subscribers.push(subscriber)
    },
    unmount: () => {
      ref.value = undefined
      // @ts-ignore
      ref = undefined
      // @ts-ignore
      subscribers = undefined
      // @ts-ignore
      sig.subscribe = undefined
      // @ts-ignore
      sig.unmount = undefined
      // @ts-ignore
      sig = undefined
    }
  }

  return sig

}


export const createStore = <R extends Record<string, any>=Record<string, any>>(
  initialState:R,
) => {
  const subIds = new Map()
  let subscribers:TSubscriber[] = []

  const state = new Proxy(initialState, {
    get(target, prop) {
      return target[prop as keyof R]
    },
    set(target, prop, value) {
      target[prop as keyof R] = value
      subscribers.forEach((fn) => fn(state))

      return true
    },
  })

  const built = ({
    state,
    subscribe: (cb:TSubscriber, id?:any) => {

      const off = () => {
        subscribers = subscribers.filter(fun => fun !== cb)
        id && subIds.delete(id)
      }

      if(!id){
        !subscribers.includes(cb) && subscribers.push(cb)
        return off
      }

      const existing = subIds.get(id)
      if(!existing){
        subscribers.push(cb)
        subIds.set(id, cb)
        return off
      }
      subscribers = subscribers.filter(fun => fun !== existing)
      subscribers.push(cb)
      subIds.set(id, cb)

      return off
    },
    unmount: (id?:any) => {
      if(id){
        const existing = subIds.get(id)
        subscribers = subscribers.filter(fun => fun !== existing)
        subIds.delete(id)
      }
    },
  } as TSignalStore)

  built.watch =(Component:TComponent) => wrap((props, rest, replaceCB:any) => {
    built.subscribe((updated) => replaceCB(
      Component({...props, state: updated}, ...rest),
      () => built.unmount(Component)
    ), Component)
  }, Component, { state: built.state })

  return built
}