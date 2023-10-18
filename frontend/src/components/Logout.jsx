import React from 'react';
import styled from 'styled-components';
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
    <LogoutBtn>
    <GrPower className="col-2" title='LogOut'  onClick={handleClick} 
    style={{fontSize:"25px"}}/>
    </LogoutBtn> 
  )
}

const LogoutBtn = styled.div`
    display:contents;
    cursor:pointer;
    path{
        stroke-width:3;
    }
   
`

export default Logout