import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserService from '../services/UserService';
import VerificationService from '../services/VerificationService';
import VerificationComponent from '../components/VerificationComponent';
import SuccessComponent from '../components/SuccessComponent';
import EmailComponent from '../components/EmailComponent';
import PasswordComponent from '../components/PasswordComponent';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isSuccessPopupOpen, setSuccessPopupOpen]=useState(false);
  const [isVerificationComponentOpen,setVarificationComponentOpen]=useState(false);
  const [isEmailPopupOpen,setEmailPopupOpen]=useState(false);
  const [isPasswordPopupOpen,setPasswordPopupOpen]=useState(false);

  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const user = { email, password };
    console.log(user);

    UserService.login(user)
      .then((res) => {
        console.warn(res);
        console.warn('Login');
        console.warn(JSON.stringify(res.data.user_id))
        if (res.data.user_id) {
          sessionStorage.setItem('userId', JSON.stringify(res.data.user_id));
          console.log('userId stored in sessionStorage:', res.data.user_id);
          navigate('/home');
        } else {
          console.warn('user_id is null or undefined');
        }

        
      })
      .catch((error) => {
        console.warn('Incorrect Email or Password');
        console.warn(error);
        setError('Incorrect Email or Password');
      });
  };

  //forgot password
  const forgotPassowrd=()=>{
setEmailPopupOpen(true);
  }

  const closeSuccessPopup=()=>{
setSuccessPopupOpen(false);
  }

const closeEmailPopup=()=>{
  setEmailPopupOpen(false);
}

const closeVerificationComponent=()=>{
  setVarificationComponentOpen(false);
}

const closePasswordComponent=()=>{
  setPasswordPopupOpen(false);
}

//enter verification code
const send=(code)=>{
  
  

  console.warn(code);
  const data={
    "code":code
  }
  VerificationService.verifyEmail(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){
    setVarificationComponentOpen(false);
    setPasswordPopupOpen(true);
    
   
  }
  })

}

const sendEmail=(email)=>{
console.warn("Email address: "+email);
const data={
  "email":email
}
UserService.forgotPassowrd(data).then(res=>{
  console.warn(res.data);

  if(res.data==true){
    setEmailPopupOpen(false)
setVarificationComponentOpen(true);
  }else{
    setError("Email not Found. Please enter correct email address");
  }
})

}

const sendPassword=(password)=>{
  console.warn("Password: "+password);
  const data={
    "password":password
  }
  UserService.resetPassword(data).then(res=>{
    console.warn(res.data);

  if(res.data==true){
    setPasswordPopupOpen(false)
setSuccessPopupOpen(true);
  }
  })
}

  return (
    <div className='login'>
      <Card className='login-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
        <Card.Body>
       
          <AccountCircleIcon style={{ width: '30px', height: '30px',color:'#FFFF' }} />
          <h3 className='label'>Login Here</h3>
          <Form onSubmit={userLogin}>
            <Form.Group controlId='formBasicUserName' style={{ marginTop:'10px' }}>
              <Form.Label className='label'>Email Address</Form.Label>
              <Form.Control
                className='input'
                type='text'
                placeholder='Enter Email Address'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword' style={{ marginTop:'10px' }}>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                className='input'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <div className='row'>
              <div className='col'>
                <Link onClick={forgotPassowrd}>Forgot Password?</Link>
              </div>
            </div>

            <Button className='login-btn' variant='primary' type='submit'>
              LOGIN
            </Button>

            <div className='row' style={{ marginTop:'10px',color:'#ffff' }}>
                <div className='col-9' style={{ textAlign:'left' }}><p>You don't have an account? </p></div>
                <div className='col-3' style={{ textAlign:'right' }}><Link to={'/signup'}>Signup</Link></div>
            </div>
            {error && <Alert variant='danger'>{error}</Alert>} {/* Display error message */}
          </Form>
        </Card.Body>
      </Card>
      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Reset Password"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isVerificationComponentOpen && (
        <VerificationComponent
          send={send}
          closePopup={closeVerificationComponent}
          
        />
      )}
      {isEmailPopupOpen && (
        <EmailComponent
          send={sendEmail}
          closePopup={closeEmailPopup}
          
        />
      )}
       {isPasswordPopupOpen && (
        <PasswordComponent
          send={sendPassword}
          closePopup={closePasswordComponent}
          
        />
      )}
    </div>
  );
}