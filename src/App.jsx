import {Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'


function App() {
  return (
      <div className='App'>
        <Navbar />
        <Outlet />
      </div> 
  )
}

export default App
