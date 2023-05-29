import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/WelcomePage.css'

function WelcomePage() {
  return (
    <div className='welcome'>
        <div className='welcome-content'>
        <div className='row'>
           
            <div className='title'>
                <h1>Welcome to the MenuMaster</h1>
            </div>
          
            
        </div>

        <div className='row'>
           
            <div className='button'>
                <Button className='login-btn' href='/login'>LOGIN</Button>
                <Button className='login-btn' href='/signup'>SIGNUP</Button>
            </div>
            
            
        </div>
        </div>
    </div>
  )
}

export default WelcomePage
