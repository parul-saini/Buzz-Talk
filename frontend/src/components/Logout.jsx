import React from 'react'
import { useNavigate } from 'react-router-dom'
import {GrPower} from 'react-icons/gr'
import { Button } from 'react-bootstrap';
function Logout() {
    const navigate =useNavigate();
    const handleClick=()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
      <GrPower className="col-2"  onClick={handleClick} style={{fontSize:"20px"}}/>
  )
}

export default Logout