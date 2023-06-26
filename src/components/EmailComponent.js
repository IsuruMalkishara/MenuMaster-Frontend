import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const EmailComponent = ({ send, closePopup }) => {
 
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleOk = () => {
    if (!email ) {
      setError('Please enter email.');
      return;
    }
    send(email);
  };

  

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        
          <Modal.Title style={{ textAlign: 'center' }}>Enter Your Email Address</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
        
          <div className='row'>
            <div className='col'>
            {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
            </div>
          </div>
          
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>Email Address</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          
          
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={closePopup} style={{ width:'100px' }}>
            Cancel
          </Button>
          <Button onClick={handleOk} style={{ width:'100px' }}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailComponent;