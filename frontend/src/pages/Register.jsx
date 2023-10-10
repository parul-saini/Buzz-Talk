import React from 'react'
import styled from 'styled-components';
import {Link} from "react-router-dom";
import logo from "../assests/logo.png"
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Register() {
  const  handleEvent=(event)=>{
  event.preventDefault();
  alert("form submit");
  }

  const  handleChange=(event)=>{
  
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
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="User name" name='user name' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  name='email' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"  name='password'  onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password"  name='ConfirmPassword' onChange={(e)=>{handleChange(e)}}/>
            </Form.Group>
    
            <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit">
              Create User  
            </Button>
            <p>  Already have an account ? <Link to="/login">Login</Link> </p>
          </Form>
          
          </Col>
        </Row>
      </div>
    </>
  )
}


export default Register
