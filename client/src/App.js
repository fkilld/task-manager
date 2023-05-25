import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import TaskManager from './components/TaskManager'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TaskManager />
    </BrowserRouter>
  )
}

export default App
