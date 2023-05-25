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
