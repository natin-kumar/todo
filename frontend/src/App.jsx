import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import TaskBoard from "../src/components/TaskBoard/TaskBoard.jsx"
import Sidebar from './components/Sidebar/Sidebar.jsx'
function App() {

  return (
    <>
    <Sidebar/>
      <TaskBoard/>
    </>
  )
}

export default App
