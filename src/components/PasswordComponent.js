import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const PasswordComponent = ({ send, closePopup }) => {
 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOk = () => {
    if (!password ) {
      setError('Please enter new password.');
      return;
    }else if(password.length<8){
        setError('Password should at least 8 characteristics.');
        return;
    }
    send(password);
  };

  

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        
          <Modal.Title style={{ textAlign: 'center' }}>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
        
          <div className='row'>
            <div className='col'>
            {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
            </div>
          </div>
          
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>Password</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          
          
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={closePopup} style={{ width:'100px' }}>
            Cancel
          </Button>
          <Button onClick={handleOk} style={{ width:'100px' }}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PasswordComponent;