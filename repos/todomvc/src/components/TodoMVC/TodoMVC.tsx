import type { AppState } from '@LKT/store/state'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Layout } from '@LKT/styles/base'
import { TodoList } from '@LKT/components/TodoList/TodoList'
import { UnderBar } from '@LKT/components/UnderBar/UnderBar'
import { NewTodo } from '@LKT/components/NewTodo/NewTodo'
import { recoilState, LocalStorageKey } from '@LKT/store/state'

export const TodoMVC: React.FC = () => {
  const appState = useRecoilValue<AppState>(recoilState)

  // if appState has changes, save it LocalStorage.
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState), // convert JavaScript Object to string
    )
  }, [appState])

  return (
    <Layout>
      <section className="todoapp">
        <NewTodo />
        {appState.todoList.length ? (
          <>
            <TodoList />
            <UnderBar />
          </>
        ) : null}
      </section>
    </Layout>
  )
}
