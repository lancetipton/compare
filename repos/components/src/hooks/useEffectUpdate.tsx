import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'


export const useEffectUpdate = (cb: EffectCallback, deps?: DependencyList) => {
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    cb()
  }, deps)
}
