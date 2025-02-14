import React ,{useEffect}from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import TaskBoard from './components/TaskBoard/TaskBoard.jsx';
function App() {

  const taskBoardData =["Todo","In-Progress","Done"];

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        {/* TaskBoard Container */}
        <DndProvider backend={HTML5Backend}>
        <div className="taskboard-container">
          {
            taskBoardData.map((ele)=>{
              return <TaskBoard heading={ele}/>
            })
          }
          
        </div>
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
