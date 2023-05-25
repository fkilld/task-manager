import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskEditor from './TaskEditor'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const {
        data: { tasks },
      } = await axios.get('/api/v1/tasks')
      setTasks(tasks)
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
      console.error(error)
    }
  }

  const selectTask = (task) => {
    setSelectedTask(task)
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
          <button onClick={() => selectTask(task)} className='edit-link'>
            Edit
          </button>
          <button onClick={() => deleteTask(task._id)} className='delete-btn'>
            Delete
          </button>
        </div>
      ))}
      {selectedTask && (
        <TaskEditor
          task={selectedTask}
          onCancel={() => setSelectedTask(null)}
          onSave={fetchTasks}
        />
      )}
    </div>
  )
}

export default TaskManager
