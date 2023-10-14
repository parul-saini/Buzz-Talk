import React from 'react'
import { useNavigate } from 'react-router-dom'
import {GrLogout} from 'react-icons/gr'
import { Button } from 'react-bootstrap';
function Logout() {
    const navigate =useNavigate();
    const handleClick=()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <Button className='btn-danger' onClick={handleClick}><GrLogout style={{fontSize:"30px"}}/></Button>
  )
}

export default Logout