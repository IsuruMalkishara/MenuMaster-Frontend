import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const UpdateItemPopup = ({ data,update, closePopup }) => {
  
 
  const [name, setName] = useState(data.name);
  const [price,setPrice]=useState(data.price);
  const [bannerImg,setBannerImg]=useState(data.bannerImg);
  

  const handleUpdate = () => {
    
    update(name, price, bannerImg);
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