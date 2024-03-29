import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import TarotPage from './components/TarotPage'
import SingleTarot from './components/SingleTarot'

function App() {

  return (
    <>
      <div className='app  bg-black backgroundImage '>
        <Navbar/>
      
        <Routes>
          <Route path='/' element={<TarotPage/>}/>
          <Route path='/tarots/:number' element={<SingleTarot/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
