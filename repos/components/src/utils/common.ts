import type { FC, ReactNode } from 'react'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

export const transformTransitionClassnames = (style: Record<string, string>, tname = '') => {
  return {
    enter: tname ? style[`${tname}-enter`] : style.enter,
    exit: tname ? style[`${tname}-exit`] : style.exit,
    enterActive: style[`${tname ? `${tname}-` : ''}enter-active`],
    exitActive: style[`${tname ? `${tname}-` : ''}exit-active`],
  }
}

export const PortalToBody: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
    }
  }, [])
  return mounted ? createPortal(children, document.body) : null
}
