import type {
  TState,
  TStore,
  TAction,
  TWatchCB,
  TStoreActs,
  TComponent,
  TOnDispatch,
} from '../types'

import { wrap } from './wrap'
import { isObj } from '@keg-hub/jsutils/isObj'
import { isFunc } from '@keg-hub/jsutils/isFunc'
import { exists } from '@keg-hub/jsutils/exists'
import { nanoid } from '@keg-hub/jsutils/nanoid'
import { deepClone } from '@keg-hub/jsutils/deepClone'

const Store:TStore<any> = {
  state:{},
  watchers:{},
  dispatchers:{}
}

export const destroy = <T extends TState=TState>() => {
  Object
    .entries(Store.watchers)
    .map(([id, cbs]) => {
      cbs && cbs.map((cb:TWatchCB<T>|undefined) => cb && isFunc(cb.destroy) && cb.destroy(id))
      Store.watchers[id] = undefined
      delete Store.watchers[id]
    })

  Store.state = {}
  Store.dispatchers = {}
}

export const dispatch = <T extends TState=TState, A=any>(
  id:string,
  action:TAction<A>,
  ...payload:any[]
) => {
  const dispatchers = Store.dispatchers[id]
  
  if(!dispatchers?.length) return console.warn(`Could not find dispatch slice with id ${id}`)

  const slice = Store.state[id] || {}

  const current = dispatchers.reduce((state, dispatchCB) => {
    const update = dispatchCB?.(
      state,
      action,
      ...payload
    ) as T

    return exists(update) && update !== state ? update : state
  }, slice)

  current !== slice
    && update({...Store.state, [id]: current}, id)

}


export const create = <T extends TState=TState>(
  onDispatch:TOnDispatch<T>,
  state:T,
  id?:string,
) => {

  if(!onDispatch || !isFunc(onDispatch))
    throw Error(`dispatcher.create requires an 'onDispatch' method`)

  if(!state || !isObj<T>(state))
    throw Error(`dispatcher.create requires an initial state of type 'object'`)

  const ref = id || onDispatch.id || nanoid()
  Store.dispatchers[ref] = Store.dispatchers[ref] || []
  Store.dispatchers[ref].push(onDispatch)

  Store.state = {...Store.state, [ref]: deepClone<T>(state)}

  let watcher:TWatchCB<T>

  const slice = {
    state: Store.state[ref],
    dispatch: <A=any>(action:TAction<A>, ...payload:any[]) => dispatch(ref, action, payload),
    forget: () => forget(ref, watcher),
    watch: (cb:(state:T)=>any) => {
      watcher = ((state:T) => cb(state)) as TWatchCB<T>
      return watch(ref, watcher)
    },
  } as TStoreActs<T>

  slice.wrap = (Component:TComponent) => wrap((props, rest, replaceCB:any) => {
    slice.watch((updated) => {
      const Replaced = Component({...props, ...slice, state: updated}, ...rest)
      replaceCB(Replaced, slice.forget)
    })
    
  }, Component, slice)

  return slice
}

/**
 * Checks the state for an update, and updates when needed
 * Calls all cbs linked to the passed in id
 * @param updatedState - new changes
 * @param id - used to find the linked callbacks
 * @return void
 */
export const update = <T extends TState=TState>(updatedState:T, id:string) => {
  // If no updated state, or the current state is equal to the update state
  // No update, so just return
  if(!exists(updatedState) || Store.state === updatedState)
    return Store.state

  // Otherwise update the state with the updateState param
  Store.state = updatedState

  const cbs = Store.watchers[id]
  cbs &&
    cbs.length &&
    cbs.map(cb => isFunc(cb) && cb(Store.state[id]))

  return Store.state
}

export const watch = <T extends TState=TState>(id:string, cb:TWatchCB<T>) => {
  if (!isFunc(cb))
    return console.warn(`You must pass a function as the second argument to store.listen()`)

  Store.watchers[id] = Store.watchers[id] || []
  Store.watchers?.[id]?.push(cb)

  return () => forget(id, cb)

}

export const getState = () => Store.state
export const getDispatch = () => dispatch
export const getWatchers = () => Store.watchers

export const forget = <T extends TState=TState>(id:string, cb:TWatchCB<T>) => {
  if(!id || !Store.watchers[id])
    console.warn(`You must pass and id to forget a watcher`)

  const cbIndex = Store.watchers?.[id]?.indexOf(cb)
  cbIndex
    && cbIndex !== -1
    && Store.watchers?.[id]?.splice(cbIndex, 1);
}

export const createReducer = <T extends TState=TState>(
  id:string,
  initialState:T,
  reducer:TOnDispatch<T>,
) => create<T>(
  reducer,
  initialState,
  id
)


export const dispatcher = {
  forget,
  watch,
  update,
  create,
  destroy,
  dispatch,
}
