import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useEffectOnce = (cb: EffectCallback, deps?: DependencyList) => {
  const first = useRef(true)
  useEffect(() => {
    if (!first.current) return
    first.current = false
    cb()
  }, deps)
}
