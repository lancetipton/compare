import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { TodoMVC } from '@CPAT/components/TodoMVC'
import { NotFound } from '@CPAT/components/NotFound'
import { useCompare } from '@CPAT/hooks/useCompare'
import { ErrorBoundary } from '@CPAT/components/ErrorBoundary'


export const App: React.FC = () => {

  const Compare = useCompare()

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
