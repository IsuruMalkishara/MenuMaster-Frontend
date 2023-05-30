import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import MenuService from '../services/MenuService';
import '../styles/MenuPage.css';

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuName,setMenuName]=useState('');

  const { mid } = useParams();

  useEffect(() => {
    getMenuById();
    getCategoriesByMenuId();

  }, []);

  // Get categories by menu ID
  const getCategoriesByMenuId = () => {
    CategoryService.getCategoriesByMenuId(mid)
      .then((res) => {
        console.warn(res.data);
        setCategories(res.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  //get menu by id
  const getMenuById = () => {
    MenuService.getMenusById(mid)
      .then((res) => {
        console.warn(res.data);
        setMenuName(res.data.name);
      })
      .catch((error) => {
        // Handle error
      });
  };


  return (
    <div className='menu'>
      <div className='menu-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{menuName}</h1>
            </div>
        </div>
        <div className='row' style={{ margin:'20px' }}>
          {categories.map((category) => (
            <div key={category.id} className='col' style={{ textAlign:'center' }}>
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
                <Card.Body>
                    <div className='row'>
                        <div className='col' style={{ textAlign:'center' }}>
                            <h3>{category.name}</h3>
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

export default MenuPage;
