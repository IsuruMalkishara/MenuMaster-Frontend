import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import VerificationService from '../services/VerificationService';

const VerificationComponent = ({ send, closePopup }) => {
 
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!code ) {
      setError('Please fill in all fields.');
      return;
    }
    send(code);
  };

  const resend=()=>{
    VerificationService.requestForResend().then(res=>{
        console.warn(res.data);
        
    })
  }

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        
          <Modal.Title style={{ textAlign: 'center' }}>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <p>Please check your email and enter Verification code here</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
            {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
            </div>
          </div>
          
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>Verification Code</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col' style={{ textAlign:'left' }}>
              <a onClick={resend}>Resend Verification Code</a>
            </div>
            
            
          </div>
          
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={closePopup} style={{ width:'100px' }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} style={{ width:'100px' }}>Verify</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VerificationComponent;