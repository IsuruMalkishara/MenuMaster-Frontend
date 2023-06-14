import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const BackgroundSelector = ({ change, closePopup  }) => {
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');

  const handleChange = () => {
    if (!background ) {
      setError('Please select background');
      return;
    }
    change(background);
  };

  //add banner img
const handleBackgroundImg = (files) => {
  
    const reader = new FileReader();
    reader.onload = (event) => {
      setBackground(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  
};

const handleColorChange = (event) => {
  const newColor = event.target.value;
  setBackground(newColor);
 
};



  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        <div className='row'>
          <div className='col' style={{ textAlign:'center' }}>
          <Modal.Title style={{ textAlign: 'center' }}><h3>Change Background</h3></Modal.Title>
          </div>
        </div>
          
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <div className='row'>
            <div className='col'>
            {error && <Alert variant='danger' style={{ textAlign:'center' }}>{error}</Alert>} {/* Display error message */}
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-5' style={{ textAlign:'left' }}>
              <Form.Label>BACKGROUND COLOR</Form.Label>
            </div>
            <div className='col-7'>
            <input type="color" value={background} onChange={handleColorChange} />
            </div>
          </div>
          
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-5' style={{ textAlign:'left' }}>
              <Form.Label>BACKGROUND IMAGE</Form.Label>
            </div>
            <div className='col-7'>
              <Form.Control
                className='input'
                type="file"
                accept="image/*"
                onChange={(event) => handleBackgroundImg(event.target.files)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <Button variant="secondary" onClick={closePopup} style={{ width:'100px',margin:'10px' }}>
            Cancel
          </Button>
          <Button onClick={handleChange} style={{ width:'100px',margin:'10px' }}>Save</Button>
            </div>
          </div>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BackgroundSelector;
