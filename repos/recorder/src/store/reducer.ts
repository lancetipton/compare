import { createReducer } from '@lkns/simple/store'

const UIState = {
  playing:false,
  recording:false,
}

export const slice = createReducer(`UI`, UIState, (state, action) => {
  switch(action.type) {
    case `Set-Recording`:{
      return {...UIState, recording: action.payload} as typeof UIState
    }
  }

  return UIState
})

export const Watch = slice.wrap