import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const SuccessComponent =  ({   closeSuccessPopup,message }) => {
    return (
        <div style={{ backgroundColor:'rgb(3, 122, 126)' }}>

        
      <Modal show={true} onHide={closeSuccessPopup} >
        
        <Modal.Body style={{ textAlign:'center' }}>
          <p>{message}</p>
          
        </Modal.Body>
        <Modal.Footer tyle={{ textAlign:'center' }}>
          <Button variant="secondary" onClick={closeSuccessPopup}>
            Ok
          </Button>
          
        </Modal.Footer>
      </Modal>
      </div>
    );
  };

export default SuccessComponent;