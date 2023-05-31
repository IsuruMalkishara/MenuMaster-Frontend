import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import SubCategoryService from '../services/SubCategoryService';
import '../styles/SubCategoryPage.css';

function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName,setCategoryName]=useState('');

  const { cid } = useParams();

  useEffect(() => {
    getCategoryById();
    getSubCategoriesByCategoryId();

  }, []);

  // Get sub categories by category ID
  const getSubCategoriesByCategoryId = () => {
    SubCategoryService.getSubCategoriesByCategoryId(cid)
      .then((res) => {
        console.warn(res.data);
        setSubCategories(res.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  //get category by id
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
    <div className='sub-category'>
      <div className='sub-category-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{categoryName}</h1>
            </div>
        </div>
        <div className='row' style={{ margin:'25px' }}>
          {subCategories.map((category) => (
            <div key={category.id} className='col' style={{ textAlign:'center' }}>
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '35rem' }}>
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

export default SubCategoryPage;
