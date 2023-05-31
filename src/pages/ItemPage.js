import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import ItemService from '../services/ItemService';
import '../styles/ItemsPage.css';

function ItemPage() {
  const [items, setItems] = useState([]);
  const [categoryName,setCategoryName]=useState('');

  const { cid } = useParams();

  useEffect(() => {
    getCategoryById();
    getItemsByCategoryId();

  }, []);

  // Get items
  const getItemsByCategoryId = () => {
    ItemService.getItemsByCategoryId(cid)
      .then((res) => {
        console.warn(res.data);
        setItems(res.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  //get  category by id
  const getCategoryById = () => {
    CategoryService.getCategoryById(cid)
      .then((res) => {
        console.warn(res.data);
        setCategoryName(res.data.name);
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
                <h1>{categoryName}</h1>
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

export default ItemPage;
