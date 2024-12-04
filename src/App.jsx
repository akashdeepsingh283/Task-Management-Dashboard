import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import ToDo from './components/Todo'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <p className='top-heading'>TASK MANAGEMENT DASHBOARD</p>
      <AddTodo/>
      <ToDo/>

    </>
  )
}

export default App
