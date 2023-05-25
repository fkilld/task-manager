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
