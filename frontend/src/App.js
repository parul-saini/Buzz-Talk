import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// components import 
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvtaar from './pages/SetAvtaar';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setavatar' element={<SetAvtaar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

