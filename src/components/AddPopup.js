import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddPopup = ({ add, closePopup, title }) => {
 
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name ) {
      setError('Please fill in all fields.');
      return;
    }
    add(name);
  };

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        
          <Modal.Title style={{ textAlign: 'center' }}>Add {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <div className='row'>
            <div className='col'>
            {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
            </div>
          </div>
          
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col'>
              <Form.Label>Name</Form.Label>
            </div>
            <div className='col'>
              <Form.Control
                className='input'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={closePopup}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPopup;