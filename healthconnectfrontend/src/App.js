import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import NavBar from "./Components/NavBar"
import Home from "./Pages/Home"
import Login from "./Pages/Registration/Login"
import Signup from "./Pages/Registration/Signup"
import {Routes,Route} from 'react-router-dom'
import { AppContext } from './Components/Context/AppContext'

function App() {  
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element = {<Home />}/>
      </Routes>
    </div>
  )
}

export default App;