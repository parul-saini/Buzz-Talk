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
        if(!localStorage.getItem("chat-app-user"))
            navigate("/register");
        fetchData();    
    },[])

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

   const  setProfilePic = async()=>{
    if(selectedAvataar === undefined){
        toast.error("Please select an avatar" , toastCSS);
    }
    else{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const {data} = await axios.post(`${SetAvtaarRouter}/${user._id}`,{
          image: avtaar[selectedAvataar]
        }) ;
        
        // this data come from backend 
        if(data.isSet){
          // console.log(user);
          user.isAvtaarImageSet = true;
          user.avataarImage = data.image;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          navigate("/");
        }
        else{
          // if profile do not set 
          toast.error("Please Try Again, something wrong in setting the profile picture", toastCSS);
        }

    }
   }

   const changeData= async()=> {
    setAvtaar([]);
    setIsloading(true);
    const data=[];
    for(let i=0;i<8;i++){
        const image =  await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=Q856Mm9X1yhRrH`);
        const buffer = new Buffer(image.data);
        // console.log("buffer",buffer.toString("base64"));
        data.push(buffer.toString("base64"));
    }
    setAvtaar(data);
    setIsloading(false);
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
            <div className="avatar-btns">
                <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit"
                onClick={setProfilePic}>
                Set As Profile Picture
                </Button>
                <Button  style={{ backgroundColor: '#017dc0', color: 'white' }} variant="primary" type="submit"
                onClick={changeData}>
                Choose Another
                </Button>
            </div>
        </Container>

    } 
    <ToastContainer/>
    </>
  )
}

const Container = styled.div`
    ${'' /* background-color: #131324; */}
    background-color: black;
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
    .avatar-btns{
    display:flex;
    gap:2rem;
    }
    

`;


export default SetAvtaar
