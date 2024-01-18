
import { isStr } from '@keg-hub/jsutils/isStr'
import { exists } from '@keg-hub/jsutils/exists'
import { isFunc } from '@keg-hub/jsutils/isFunc'

let nextHandle = 1
let autoIncrement = 0
let currentlyRunningATask = false
let tasksByHandle: Map<number, () => void>
let registerImmediate: (nextHandle: number) => void

const setImmediateFallback = (callback: () => void): number => {
  // @ts-ignore
  if (!isFunc(callback) || arguments.length > 1)
    throw new Error('setImmediate require callback function.')

  tasksByHandle.set(nextHandle, callback)
  registerImmediate(nextHandle)

  return nextHandle++
}

const clearImmediateFallback = (handle: number): void => {
  tasksByHandle.delete(handle)
}

const runIfPresent = (handle: number): void => {
  // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
  // So if we're currently running a task, we'll need to delay this invocation.
  if (currentlyRunningATask) {
    // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
    // 'too much recursion' error.
    setTimeout(runIfPresent, 0, handle)
    return
  }
  const callback = tasksByHandle.get(handle)
  // console.log('stttt', handle, callback)

  if (!callback) return
  currentlyRunningATask = true
  try {
    callback()
  } finally {
    clearImmediateFallback(handle)
    currentlyRunningATask = false
  }
}

const win = (typeof window === 'undefined' ? globalThis : window) as unknown as Window & {
  setImmediate: (callback: () => void) => number
  clearImmediate: (immediate: number) => void
}

if (exists(win.setImmediate)) {
  tasksByHandle = new Map()
  const messagePrefix = `setImmediate$${(autoIncrement++).toString(32)}$`
  win.addEventListener(
    'message',
    (event) => {
      if (event.source === window && isStr(event.data) && event.data.startsWith(messagePrefix)) {
        runIfPresent(Number(event.data.slice(messagePrefix.length)))
      }
    },
    false,
  )

  registerImmediate = (handle: number) => {
    win.postMessage(messagePrefix + handle, '*')
  }
}

export const setImmediate = win.setImmediate || setImmediateFallback
export const clearImmediate = win.clearImmediate || clearImmediateFallback
