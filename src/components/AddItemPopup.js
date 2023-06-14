import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddItemPopup = ({ add, closePopup }) => {
  
  const [name, setName] = useState('');
  const [price,setPrice]=useState();
  const [discount,setDiscount]=useState('');
  const [bannerImg,setBannerImg]=useState('');
  const [error, setError] = useState('');


  const handleAdd = () => {
    if (!name || !price || !discount || !bannerImg) {
      setError('Please fill in all fields.');
      return;
    }
    add(name, price, bannerImg);
  };

  //add banner img
const handleBannerImgChange = (files) => {
  
    const reader = new FileReader();
    reader.onload = (event) => {
      setBannerImg(event.target.result);
    };
    reader.readAsDataURL(files[0]);
  
};

  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        <div className='row'>
          <div className='col' style={{ textAlign:'center' }}>
          <Modal.Title style={{ textAlign: 'center' }}><h3>Add Item</h3></Modal.Title>
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
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>NAME</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>PRICE</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>DISCOUNT</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='col-4' style={{ textAlign:'left' }}>
              <Form.Label>BANNER IMAGE</Form.Label>
            </div>
            <div className='col-8'>
              <Form.Control
                className='input'
                type="file"
                accept="image/*"
                onChange={(event) => handleBannerImgChange(event.target.files)}
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
          <Button onClick={handleAdd} style={{ width:'100px',margin:'10px' }}>Add</Button>
            </div>
          </div>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddItemPopup;