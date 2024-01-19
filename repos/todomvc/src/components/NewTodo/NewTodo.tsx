import type { AppState, Todo } from '@LKT/store/state'

import { useRecoilState } from 'recoil'
import React, { createRef } from 'react'
import { recoilState } from '@LKT/store/state'
import { nanoid } from '@keg-hub/jsutils/nanoid'

import { Layout } from './NewTodo.styled'

export const NewTodo: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>()

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      const todo: Todo = {
        id: nanoid(),
        bodyText: textInput.current.value,
        completed: false,
      }

      setAppState({ todoList: [todo, ...appState.todoList] })
      textInput.current.value = ''
    }
  }

  return (
    <Layout>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          autoFocus
          ref={textInput}
          className="new-todo"
          data-testid="new-todo-input-text"
          placeholder="What needs to be done?"
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
        />
      </header>
    </Layout>
  )
}
