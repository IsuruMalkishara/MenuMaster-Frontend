import React, {useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Card, Form, Button,Alert } from 'react-bootstrap';
import SuccessComponent from '../components/SuccessComponent';
import UserService from '../services/UserService';
import VerificationComponent from '../components/VerificationComponent';
import VerificationService from '../services/VerificationService';
import '../styles/SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
    const [error, setError] = useState('');
   
    const [isVerificationComponentOpen, setVarificationComponentOpen] = useState(false);
    


//add
const handleAdd=(event)=>{
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
      }else if(!password){
      setError('Password is required.');
      return;
    }else if (password.length < 8) {
      setError('Password should be at least 8 characters.');
      return;
    }else if(!confirmPassword){
      setError(' Confirm Password is required.');
      return;
    }else if (password !== confirmPassword) {
      setError('Confirm Password should be match with Password.');
      return;
    }else{
  const data={  
   "name":name,
   "email":email,
   "phone":phone,
   "password":password,
   
  }

  console.warn(data);
  UserService.addUser(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){

      setVarificationComponentOpen(true);
      
    }else{
      setError("This email address already used");
    }
  })
}
}

// Email validation using regex
const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

//enter verification code
const send=(code)=>{
  
  

  console.warn(code);
  const data={
    "code":code
  }
  VerificationService.verify(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){
    setVarificationComponentOpen(false);
    setSuccessPopupOpen(true);
    
   
  }
  })

}

//close verification component
const closeVerificationComponent=()=>{
  setVarificationComponentOpen(false);
}

//close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/login')
}
    
        return (
            <>
            <div className='signup'>
              <div className='row'>
                <div className='col' style={{ textAlign:'center',color:'#ffff' }}>
                  <h1>Signup Page</h1>
                </div>
              </div>
              
            <Card className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)' }}>
        <Card.Body>
        {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
        <Form onSubmit={handleAdd}>
        
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Name:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Email Address:</Form.Label></div>
            <div className='col-8'><Form.Control
            placeholder='abc@gmail.com'
            className='input'
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Contact Number:</Form.Label></div>
            <div className='col-8'><Form.Control
            placeholder='94*********'
            className='input'
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          /></div>
        </div> 
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Password:</Form.Label></div>
            <div className='col-8'><Form.Control
            className='input'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          /></div>
        </div>
        <div className='row' style={{ marginTop:'10px' }}>
        <div className='col-4'><Form.Label className='label'>Confirm Password:</Form.Label></div>
            <div className='col-8'><Form.Control
           
            className='input'
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          /></div>
        </div>  

          

<div className='row' style={{ marginTop:'10px' }}>
  <div className='col' style={{ textAlign:'center' }}>
  <Button className='save-btn' variant="primary" type="submit" >
            SIGNUP
  </Button>

  </div>
</div>
<div className='row' style={{ marginTop:'10px',color:'#ffff' }}>
    <div className='col' style={{ textAlign:'left' }}><p>You have an account?  <Link to={'/login'}>Login</Link> </p></div>
                
</div>

</Form>
      </Card.Body>
    </Card>
      </div>
      

      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Registered with MenuMaster"
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
    </>
        );
    
}

