import { createStore } from '@cpar/simple/store'

const UIState = {
  playing:false,
  recording:false,
}

const {
  state,
  watch,
  subscribe,
} = createStore(UIState)

export {
  state as State,
  watch as Provider,
  subscribe as Subscribe,
}
