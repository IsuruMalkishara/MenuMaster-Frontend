import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const SubCategoryOrItemPopup = ({ choose,closePopup }) => {
 
  const [result, setResult] = useState("item");
  
  const handleSelectionChange = (event) => {
    setResult(event.target.value);
  };

  const handleChoose=()=>{
  choose(result);
  }


  return (
    <div style={{ backgroundColor: 'rgb(3, 122, 126)' }}>
      <Modal show={true} onHide={closePopup}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
        
          <Modal.Title style={{ textAlign: 'center' }}>Choose SubCategory Or Item</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
        <div className='row'>
          <div className='col'>
      <label>
        <input
          type="radio"
          value="item"
          checked={result === 'item'}
          onChange={handleSelectionChange}
        />
        Item
      </label>
      </div>
      <div className='col'>
      <label>
        <input
          type="radio"
          value="subcategory"
          checked={result === 'subcategory'}
          onChange={handleSelectionChange}
        />
        Subcategory
      </label>
      </div>
    </div>
            
        </Modal.Body>
        <Modal.Footer style={{ textAlign: 'center' }}>
          <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
            <Button variant="secondary" onClick={closePopup} style={{ width:'100px',margin:'10px' }}>
            Cancel
          </Button>
          <Button onClick={handleChoose} style={{ width:'100px',margin:'10px' }}>Ok</Button>
            </div>
          </div>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubCategoryOrItemPopup;