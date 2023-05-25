import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskManager from './components/TaskManager'
import TaskEditor from './components/TaskEditor'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskManager />} />
        <Route path="/tasks/:id" element={<TaskEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
