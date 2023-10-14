import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import logo from "../assests/logo.png"
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRouter } from '../utils/ApiRoutes';

function Login() {
  const [values ,setValues]= useState({
  userName:"",
  password:"",
  });
  const navigate = useNavigate();
  
  useEffect(()=>{
    if( localStorage.getItem('chat-app-current-user')) 
      navigate('/')
  },[])

  const  handleChange=(event)=>{
    setValues({...values, [event.target.name]:event.target.value});
  }

  const handleEvent= async(event)=>{
    event.preventDefault();
    if(handleValidation()) {
      const {userName,password} = values;
      const {data} = await axios.post(loginRouter,{
        userName,
        password
      });
      
      if(data.status === false )
      toast.error(data.msg, toastCSS);

      if(data.status === true){
        //console.log(data)
        localStorage.setItem('chat-app-current-user',JSON.stringify(data.user));
        navigate("/");
      }
    }
  }
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

  // check the input fields before submitting the form 
  const handleValidation=()=>{
   const {userName,password} = values;

   if(userName.length<1||password<1 ){
    toast.error("Username and Password are Required ", toastCSS);
    return false;
   }
  //  else if(password.toString() !== confirmPassword.toString() ){
  //   toast.error("Password and Confirm Password should be same ", toastCSS);
  //   return false;
  //  }
   return true;
  }


  return (
    <>
      <div className="container-register" style={{}}>
      
        <Row style={{margin:"0px"}}>
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
              <Form.Control type="text" placeholder="User name" value={values.userName} name='userName' onChange={(e)=>{handleChange(e)}} min={3}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password <sup>*</sup></Form.Label>
              <Form.Control type="password" placeholder="Password" value={values.password} name='password'  onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
    
            <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit">
              Login
            </Button>
            <p className='m-2'> Don't have an account ? <Link to="/register">Register</Link> </p>
          </Form>
          
          </Col>
        </Row>
        <ToastContainer />
       
      </div>
    </>
  )
}


export default Login
