import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvtaarRouter } from '../utils/ApiRoutes';
import {Buffer } from "buffer";
import Button from 'react-bootstrap/Button';
import loader from "../assests/loader.gif";



const SetAvtaar = () => {
    const api = "https://api.multiavatar.com/456798";
    const navigate = useNavigate();
    const [avtaar,setAvtaar] = useState([]);
    const [isloading, setIsloading]= useState(true);
    const [selectedAvataar, setSelectAvtaar] = useState(undefined);
    const [chooseMore, setChooseMore]= useState(false);
    

    async function fetchData() {
        const data = [];
        for(let i=0;i<8;i++){
            const image =  await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=Q856Mm9X1yhRrH`);
            const buffer = new Buffer(image.data);
            // console.log("buffer",buffer.toString("base64"));
            data.push(buffer.toString("base64"));
        }
        setAvtaar(data);
        setIsloading(false);
    }

    useEffect(()=>{
        fetchData();     
    },[]);

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

   const  setProfilePic= ()=>{
    if(selectedAvataar=== undefined){
        toast.error("Please select an avatar" , toastCSS);
    }
   }

  return (
    <>
    {
    isloading ? 
        <Container>
         <img src={loader} alt="Loading"  />
        </Container>:
        /* when loading is done */
        <Container>
            <div className="title-avtaar">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avtaars">
                {  avtaar.map((avatar, index)=>{
                return(
                <div key={index} className={`avatar ${selectedAvataar === index? "selected" :" " }`}>
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="" onClick={()=> setSelectAvtaar(index)}/>
                </div>
                )   
                })
                }
            </div>
            <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit"
            onClick={setProfilePic}>
            Set As Profile Picture
            </Button>
            <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit"
            onClick={()=> setChooseMore(!chooseMore)}>
            Choose Another
            </Button>
        </Container>

    } 
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
    background-color: #131324;
    font-family: emoji;
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100vw;
    height:100vh;
    gap:3rem;
    .loader{
        max-inline-size:100%
    }
    .avtaars{
      display:flex;
      gap: 2rem;
      .avatar{
        border: 0.4rem solid transparent ;
        padding : 0.4rem;
        border-radius: 5rem;
        display:flex;
        justify-content: center;
        align-items: center;
        transition : 0.5s ease-in-out;
        img{
            height: 6rem;
        }

      }
      .selected{
        border: 0.4rem solid #017dc0;
      }
    }
    

`;


export default SetAvtaar
