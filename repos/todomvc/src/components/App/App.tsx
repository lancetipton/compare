import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { TodoMVC } from '@LKT/components/TodoMVC'
import { NotFound } from '@LKT/components/NotFound'
import { useLikeness } from '@LKT/hooks/useLikeness'
import { ErrorBoundary } from '@LKT/components/ErrorBoundary'


export const App: React.FC = () => {

  const Likeness = useLikeness()

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<TodoMVC />} />
            <Route path="/active" element={<TodoMVC />} />
            <Route path="/completed" element={<TodoMVC />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
