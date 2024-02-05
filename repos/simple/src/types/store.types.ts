import type {
  TElAttrs,
  TChildEls,
} from './simple.types'

export type TState = Record<string, any>

export type TAction<P=unknown> = {
  payload?:P
  type:string
}

export type TDispatchFun<T extends TState=TState, A=unknown> = (
  state:T,
  action:TAction<A>,
  ...payload:any[]
) => T

export type TOnDispatch<S extends TState=TState, A=unknown> = TDispatchFun<S, A> & {
  id?:string
}


export type TWatchCB<S extends TState=TState> = (<T extends S=S>(state:T) => any) & {
  destroy: (id:string) => void
}

export type TStore<S extends TState=TState> = {
  state:S
  dispatchers:Record<string, TOnDispatch<S>[]>
  watchers:Record<string, Array<TWatchCB<S>|undefined>|undefined>
}

export type TComponent = (...args:any[]) => SVGElement | HTMLElement

export type TStoreActs<T extends TState=TState, A=unknown> = {
  state: Partial<TState>
  forget: () => void
  watch: (cb:(state:T)=>any) => void,
  dispatch: (action:TAction<A>, ...payload:any[]) => void
  wrap: (Component:TComponent) => TComponent
}

export type TOnMutation = () => any
export type TOnWrapRenderCB = (Component:SVGElement|HTMLElement, onMutation?:TOnMutation) => void
export type TWrapCB = (props:TElAttrs, rest:TChildEls[], cb:TOnWrapRenderCB) => void