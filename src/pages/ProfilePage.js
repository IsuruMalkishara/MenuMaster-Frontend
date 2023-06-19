import React, { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import UserService from '../services/UserService';
import BackgroundService from '../services/BackgroundService';
import '../styles/ProfilePage.css';

export default function ProfilePage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [background,setBackground]=useState('linear-gradient(to right, rgb(47, 102, 86), rgb(89, 1, 92))');

  const navigate = useNavigate();

  useEffect(() => {
   
    const userId=sessionStorage.getItem('userId');
    console.warn("user "+userId);
    getUserById(userId);
    getBackground(userId);

  }, []);

  const getUserById=(id)=>{
    UserService.getUserById(id).then(res=>{
        console.warn(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setLogo(res.data.logo);
    })
  }

  //get background
  const getBackground=(id)=>{
    BackgroundService.getBackground(id).then(res=>{
      console.warn(res.data.background);
      if(res.data.background!==null){
      setBackground(res.data.background);
      }
    })
    }
    
  const handleEdit=()=>{
    navigate('/profile/edit');
  }

  return (
    <div className='profile'
    style={{
      background: background.startsWith('#') ? background : `url(${background}) center center / cover no-repeat`,
    }}>
      <Card className='profile-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
        <Card.Body>
        <div className='row'>
            <div className='col' style={{ textAlign:'right' }}>
            <IconButton onClick={() => handleEdit()}>
                      <EditIcon />
            </IconButton>
            </div>
        </div>  
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h3 className='label'>{name}</h3>
            </div>
        </div>
        <div className='row'>
        <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>Name: </p>
        </div>
            <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>{name}</p>
            </div>
        </div>
       
        <div className='row'>
        <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>Email Address: </p>
            </div>
            <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>{email}</p>
            </div>
        </div>
        <div className='row'>
        <div className='col' style={{ textAlign:'left' }} >
            <p className='label'>Contact Number: </p>
            </div>
            <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>{phone}</p>
            </div>
        </div>
        <div className='row'>
        <div className='col' style={{ textAlign:'left' }}>
            <p className='label'>Logo: </p>
            </div>
            <div className='col' style={{ textAlign:'left' }}>
            <img src={logo} height={'100px'} width={'100px'}/>
            </div>
        </div>
                 
         
        </Card.Body>
      </Card>
    </div>
  );
}