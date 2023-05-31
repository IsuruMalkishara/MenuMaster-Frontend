import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CategoryService from '../services/CategoryService';
import MenuService from '../services/MenuService';
import SubCategoryService from '../services/SubCategoryService';
import '../styles/MenuPage.css';

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuName,setMenuName]=useState('');

  const { id,mid } = useParams();
  
  const navigate=useNavigate();

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

  //click category
  const handleCardClick=(cid)=>{
    SubCategoryService.getSubCategoriesByCategoryId(cid).then(res=>{
      console.warn(res.data);
      
      console.warn(res.data.length);
    if(res.data.length!==0){
      console.warn("Navigate to sub category page");
    navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/sub');
    }else{
      console.warn("Navigate to item page");
      navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/item');
    }
    })
    
  }


  return (
    <div className='menu'>
      <div className='menu-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{menuName}</h1>
            </div>
        </div>
        <div className='row' style={{ margin:'25px' }}>
          {categories.map((category) => (
            <div key={category.id}
            className='col'
            style={{ textAlign: 'center' }}
            onClick={() => handleCardClick(category.id)}
            role="button">
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

export default MenuPage;
