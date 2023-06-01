import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const DeletePopup =  ({  confirmDelete, closePopup,message }) => {
    return (
        <div style={{ backgroundColor:'rgb(3, 122, 126)' }}>

        
      <Modal show={true} onHide={closePopup} >
        <Modal.Header closeButton style={{ textAlign:'center' }}>
          <Modal.Title tyle={{ textAlign:'center' }}>Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign:'center' }}>
          <p>{message}</p>
          
        </Modal.Body>
        <Modal.Footer tyle={{ textAlign:'center' }}>
          <Button variant="secondary" onClick={closePopup}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };

export default DeletePopup;