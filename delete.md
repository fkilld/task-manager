User
src\components\TaskEditor.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

function TaskEditor() {
 let { id } = useParams()
  const [task, setTask] = useState(null)
  const [taskName, setTaskName] = useState('')
  const [taskCompleted, setTaskCompleted] = useState(false)
  const navigate = useNavigate() 
const fetchTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`) // use `id` instead of `params.id`
    setTask(task)
    setTaskName(task.name)
    setTaskCompleted(task.completed)
    
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    fetchTask()
  }, [])
const editTask = async (event) => {
  event.preventDefault()
  console.log(
    `Editing task with name ${taskName} and completed status ${taskCompleted}`
  )
  try {
    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      // use `id` instead of `params.id`
      name: taskName,
      completed: taskCompleted,
    })
    console.log('Successfully edited task, server responded with:', task)
    setTask(task)
    setTaskName(task.name)
    setTaskCompleted(task.completed)
    navigate('/')
  } catch (error) {
    console.error('An error occurred while editing the task:', error)
  }
}

  if (!task) {
    return <div>Loading...</div>
  }

return (
  <div className='task-editor'>
    <form onSubmit={editTask} className='edit-form'>
      <label className='edit-label'>Task ID: {task._id}</label>
      <input
        type='text'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className='edit-input'
      />
      <input
        type='checkbox'
        checked={taskCompleted}
        onChange={(e) => setTaskCompleted(e.target.checked)}
        className={taskCompleted ? 'completed' : ''}
      />
      <button type='submit' className='edit-btn'>
        Edit
      </button>
    </form>
    <Link to='/' className='back-link'>
      Back to tasks
    </Link>
  </div>
)

}

export default TaskEditor

src\components\TaskManager.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [taskName, setTaskName] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const {
        data: { tasks },
      } = await axios.get('/api/v1/tasks')
      setTasks(tasks)
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const deleteTask = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const createTask = async (event) => {
    event.preventDefault()
    if (!taskName) return
    try {
      await axios.post('/api/v1/tasks', { name: taskName })
      setTaskName('')
      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

return (
  <div className='task-container'>
    <form onSubmit={createTask} className='task-form'>
      <input
        type='text'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder='e.g. wash dishes'
        className='task-input'
      />
      <button type='submit' className='submit-btn'>
        Submit
      </button>
    </form>
    {tasks.map((task) => (
      <div key={task._id} className='task-item'>
        <h5 className={task.completed ? 'task-name completed' : 'task-name'}>
          {task.name}
        </h5>
        {task.completed ? (
          <span className='completed-notice'>Marked as complete</span>
        ) : null}
        <Link to={`/tasks/${task._id}`} className='edit-link'>
          Edit
        </Link>
        <button onClick={() => deleteTask(task._id)} className='delete-btn'>
          Delete
        </button>
      </div>
    ))}
  </div>
)

 
}

export default TaskManager

src\App.js

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

now please make this whole app in single page and please write a clean code and if you think there is anything you want to change you can add or delete  for better quality and for single page  mean  for edit i dont have to goto  other page 