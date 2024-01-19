import type { AppState, Todo } from '@LKT/store/state'

import React from 'react'
import { useRecoilState } from 'recoil'
import { Layout } from './UnderBar.styled'
import { recoilState } from '@LKT/store/state'
import { FilterLink } from '@LKT/components/FilterLink'

export const UnderBar: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const completed: number = appState.todoList.filter(t => t.completed === true).length
  const backlog: number = appState.todoList.filter(t => t.completed === false).length

  function clearCompleted(): void {
    setAppState({
      todoList: appState.todoList.filter((t: Todo) => !t.completed),
    })
  }

  return (
    <Layout>
      <footer className="footer">
        <span className="todo-count">
          <strong data-testid="remaining-uncompleted-todo-count">{backlog}</strong>{' '}
          item left
        </span>
        <FilterLink />

        {completed > 0 && (
          <button
            onClick={clearCompleted}
            className="clear-completed"
            data-testid="clear-completed-button"
          >
            Clear completed
          </button>
        )}
      </footer>
    </Layout>
  )
}
