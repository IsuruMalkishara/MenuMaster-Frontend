import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import SubCategoryService from '../services/SubCategoryService';
import ItemService from '../services/ItemService';
import '../styles/ItemsPage.css';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [subCategoryName,setSubCategoryName]=useState('');

  const { sid } = useParams();

  useEffect(() => {
    getSubCategoryById();
    getItemsBySubCategoryId();

  }, []);

  // Get items
  const getItemsBySubCategoryId = () => {
    ItemService.getItemsBySubCategoryId(sid)
      .then((res) => {
        console.warn(res.data);
        setItems(res.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  //get sub category by id
  const getSubCategoryById = () => {
    SubCategoryService.getSubCategoryById(sid)
      .then((res) => {
        console.warn(res.data);
        setSubCategoryName(res.data.name);
      })
      .catch((error) => {
        // Handle error
      });
  };


  return (
    <div className='item'>
      <div className='item-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{subCategoryName}</h1>
            </div>
        </div>
        <div className='row' style={{ margin:'25px' }}>
          {items.map((item) => (
            <div key={item.id} className='col' style={{ textAlign:'center' }}>
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '35rem' }}>
              <Card.Img variant="top" src={item.banner_img} />
                <Card.Body>
                    <div className='row'>
                        <div className='col' style={{ textAlign:'center' }}>
                            <h3>Name: {item.name}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col' style={{ textAlign:'center' }}>
                            <h5>Price: RS:{item.price}</h5>
                        </div>
                    </div>
                  
                </Card.Body>
              </Card>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
