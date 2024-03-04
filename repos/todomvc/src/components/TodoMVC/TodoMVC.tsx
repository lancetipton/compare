import type { AppState } from '@CPAT/store/state'

import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Layout } from '@CPAT/styles/base'
import { TodoList } from '@CPAT/components/TodoList/TodoList'
import { UnderBar } from '@CPAT/components/UnderBar/UnderBar'
import { NewTodo } from '@CPAT/components/NewTodo/NewTodo'
import { recoilState, LocalStorageKey } from '@CPAT/store/state'

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
