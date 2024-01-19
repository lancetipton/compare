import type { ReactElement } from 'react'
import type { AppState, Todo } from '@LKT/store/state'

import React from 'react'
import { useRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'
import { recoilState } from '@LKT/store/state'

import { Layout } from './TodoList.styled'
import { TodoItem } from '@LKT/components/TodoItem'

export const TodoList: React.FC = () => {
  const { pathname } = useLocation()
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)

  function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>): void { /* eslint-disable-line prettier/prettier */
    // reverse all todo.completed: boolean flag
    setAppState({ todoList: appState.todoList.map((t: Todo): Todo => ({ ...t, completed: e.target.checked })) }) /* eslint-disable-line prettier/prettier */
  }

  return (
    <Layout>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAllCheckbox}
          data-testid="toggle-all-btn"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-testid="todo-list">
          {appState.todoList
            .filter((t: Todo): boolean => {
              switch (pathname) {
                case '/':
                  return true
                case '/active':
                  return t.completed === false
                case '/completed':
                  return t.completed === true
                default:
                  return true
              }
            })
            .map((t: Todo): ReactElement => {
              return <TodoItem key={t.id} todo={t} />
            })}
        </ul>
      </section>
    </Layout>
  )
}
