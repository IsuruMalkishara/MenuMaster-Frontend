import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const UpdateItemPopup = ({ data,update, closePopup }) => {
  
 
  const [name, setName] = useState(data.name);
  const [price,setPrice]=useState(data.price);
  const [bannerImg,setBannerImg]=useState(data.bannerImg);
  const [discount,setDiscount]=useState(data.discount);
  const [error, setError] = useState('');

  const handleUpdate = () => {
    if(discount <0 || discount >100){
      setError('Enter valid value for discount');
      return;
    }
    
    update(name, price, bannerImg,discount);
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
        
          <Modal.Title style={{ textAlign: 'center' }}>Update Item</Modal.Title>
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
          <Button variant="secondary" onClick={closePopup} style={{ width:'100px' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} style={{ width:'100px' }}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateItemPopup;