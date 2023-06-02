import React, { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Card,Button,Alert,Form } from 'react-bootstrap';
import UserService from '../services/UserService';
import SuccessComponent from '../components/SuccessComponent';
import '../styles/EditProfilePage.css';

export default function ProfilePage() {

    const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [error, setError] = useState('');

  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {
   
    const userId=sessionStorage.getItem('userId');
    console.warn("user "+userId);
    getUserById(userId);

  }, []);

  const getUserById=(id)=>{
    UserService.getUserById(id).then(res=>{
        console.warn(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setLogo(res.data.logo);
        setId(res.data.id);
    })
  }

  const editProfile=(event)=>{
    event.preventDefault();
    if(!name){
        setError('Name is required.');
        return;
      }else if(!email){
        setError('Email Address is required.');
        return;
      }else if (!validateEmail(email)) {
        setError('Invalid Email Address.');
        return;
      }else if(!phone){
          setError(' Contact number is required.');
          return;
        }else if (phone.length !== 11) {
          setError('Contact number should have 11 digits.');
          return;
        }else{

            const data={  
                "name":name,
                "email":email,
                "phone":phone,
                "logo":logo
               }

               console.warn(data);

UserService.updateUser(id,data).then(res=>{
    console.warn(res.data);
    if(res.data.result===true){
        setSuccessPopupOpen(true);
    }
})
      }
    
  }

  //add logo
const handleLogoChange = (files) => {
  
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  
};

// Email validation using regex
const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  //close success popup
const closeSuccessPopup=()=>{
    setSuccessPopupOpen(false);
    navigate('/profile');
  }
  return (
    <div className='profile'>
      <Card className='profile-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
        <Card.Body>
        {error && <Alert variant='danger'>{error}</Alert>} {/* Display error message */}
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <h3 className='label'>{name}</h3>
            </div>
        </div>
        <Form onSubmit={editProfile}>
            <div className='row' style={{ marginTop:'10px' }}>
                <div className='col' style={{ textAlign:'left' }}> <Form.Label className='label'>Name:</Form.Label></div>
                <div className='col' style={{ textAlign:'left' }}>
                <Form.Control
                className='input'
                type='text'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
                </div>
             
            </div>

            <div className='row' style={{ marginTop:'10px' }}>
            <div className='col' style={{ textAlign:'left' }}>
              <Form.Label className='label'>Email Address:</Form.Label>
              </div>
              <div className='col' style={{ textAlign:'left' }}>
              <Form.Control
                className='input'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              </div>
              </div>
            <div className='row' style={{ marginTop:'10px' }}>
            <div className='col' style={{ textAlign:'left' }}>
              <Form.Label className='label'>Contact Number:</Form.Label>
              </div>
              <div className='col' style={{ textAlign:'left' }}>
              <Form.Control
                className='input'
                type='text'
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              </div>
              </div>

            <div className='row' style={{ marginTop:'10px' }}>
            <div className='col' style={{ textAlign:'left' }}>
              <Form.Label className='label'>Logo:</Form.Label>
              </div>
              <div className='col' style={{ textAlign:'left' }}>
              <Form.Control
              className='input'
            type="file"
            accept="image/*"
             onChange={(event) => handleLogoChange(event.target.files)}
    />
    </div>
            </div>

            

            <Button className='update-btn' variant='primary' type='submit'>
              Update
            </Button>

            
          </Form> 
         
        </Card.Body>
      </Card>
      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully update profile"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}
    </div>
  );
}