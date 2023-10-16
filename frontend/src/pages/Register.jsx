import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";
import logo from "../assests/logo.png"
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRouter } from '../utils/ApiRoutes';


function Register() {
  const [values,setValues]= useState({
  userName:"",
  email:"",
  password:"",
  confirmPassword:""
  });

  const navigate = useNavigate();

  // CSS of toast 
  const toastCSS = {
    position:"top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"light"
  }

  useEffect(()=>{
    if(localStorage.getItem("chat-app-current-user"))
      navigate("/");
    else
    toast.info("Please firstly registered Yourself " , toastCSS);
  },[])

  const  handleChange=(event)=>{
    setValues({...values, [event.target.name]: event.target.value});
  }

 
  const handleEvent= async(event)=>{
    event.preventDefault();
    if(handleValidation()) {
      const {userName,email,password,confirmPassword} = values;
      const {data} = await axios.post(registerRouter,{
        userName,
        email,
        password
      });
      
      if(data.status === false )
      toast.error(data.msg, toastCSS);

      if(data.status === true)
      {  //console.log(data)
        localStorage.setItem("chat-app-current-user",JSON.stringify(data.user));
        navigate("/");
      }

    }
  }

  // check the input fields before submitting the form 
  const handleValidation=()=>{
   const {userName,email,password,confirmPassword} = values;

   if(email.toString().length < 1){
    toast.error("All fields are Required ", toastCSS);
    return false;
   }
   else if(password.toString() !== confirmPassword.toString() ){
    toast.error("Password and Confirm Password should be same ", toastCSS);
    return false;
   }
   else if(password.toString().length < 5 ){
    toast.error("Password should be equal or greater than 5 characters", toastCSS);
    return false;
   }
   else if(userName.toString().length <= 3){
    toast.error("User-Name should be greater than 3 characters", toastCSS);
    return false;
   }
   return true;
  }


  return (
    <>
      <div className="container-register" style={{}}>
      
        <Row>
          <Col lg="5" s="12">
            <div className="brandName" style={{
              height:" 100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"}}>
                <img src={logo} alt="Logo" className='logo' />
            </div>
          </Col>     
          <Col lg="7" s="12" style={{    width: "46%",
            display:" flex",
            flexDirection: "column" ,
            justifyContent: "center"}}>
          
          <Form onSubmit={(event)=>{handleEvent(event)}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name <sup>*</sup></Form.Label>
              <Form.Control type="text" placeholder="User name"  name='userName' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address <sup>*</sup></Form.Label>
              <Form.Control type="email" placeholder="Enter email"  name='email' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password <sup>*</sup></Form.Label>
              <Form.Control type="password" placeholder="Password"  name='password'  onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password <sup>*</sup></Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
    
            <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit">
              Create User  
            </Button>
            <p className='m-2'>  Already have an account ? <Link to="/login">Login</Link> </p>
          </Form>
          
          </Col>
        </Row>
        <ToastContainer />
       
      </div>
    </>
  )
}


export default Register
