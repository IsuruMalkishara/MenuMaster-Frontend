import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CategoryService from '../services/CategoryService';
import MenuService from '../services/MenuService';
import SubCategoryService from '../services/SubCategoryService';
import ItemService from '../services/ItemService';
import AddPopup from '../components/AddPopup';
import DeletePopup from '../components/DeletePopup';
import UpdatePopup from '../components/UpdatePopup';
import SuccessComponent from '../components/SuccessComponent';
import SubCategoryOrItemPopup from '../components/SubCategoryOrItemPopup';
import BackgroundService from '../services/BackgroundService';
import '../styles/MenuPage.css';

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuName,setMenuName]=useState('');
  const [categoryId,setCategoryId]=useState('');
  const [categoryToUpdate,setCategoryToUpdate]=useState(null);

  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);
  const [isSubOrItemOpen,setSubOrItemOpen]=useState(false);

  const [subCategoryList,setSubCategoryList]=useState([]);
  const [itemList,setItemList]=useState([]);

  const [background,setBackground]=useState('linear-gradient(to right, rgb(47, 102, 86), rgb(89, 1, 92))');

  const { id,mid } = useParams();
  
  const navigate=useNavigate();

  useEffect(() => {
    getBackground(id);
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

  //get subcategories by category id
  const getSubCategoriesByCategoryId=(id)=>{
SubCategoryService.getSubCategoriesByCategoryId(id).then(res=>{
  console.warn(res.data);
  setSubCategoryList(res.data);
})
  }

  //get item by category id
  const getItemsByCategoryId=(id)=>{
ItemService.getItemsByCategoryId(id).then(res=>{
  console.warn(res.data);
  setItemList(res.data);
})
  }

  //get background
const getBackground=(id)=>{
  BackgroundService.getBackgrountOfBranch(id).then(res=>{
    console.warn(res.data.background);
    if(res.data.background!==null){
      setBackground(res.data.background);
    }
   
  })
  }

  //click category
  const handleCardClick=(cid)=>{
    getItemsByCategoryId(cid);
    getSubCategoriesByCategoryId(cid);


    
    if(subCategoryList.length!==0){
      console.warn("Navigate to sub category page");
    navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/sub');
    }else if (itemList.length!==0){
      console.warn("Navigate to item page");
      navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/item');
    }else{
      setSubOrItemOpen(true);
      setCategoryId(cid);
    }
   
    
  }

  const choose=(result)=>{
   console.warn("result "+result);
   
    if(result=="item"){
      navigate('/branch/'+id+'/menu/'+mid+'/category/'+categoryId+'/item');
      
    }else{
      navigate('/branch/'+id+'/menu/'+mid+'/category/'+categoryId+'/sub');
    }
 setSubOrItemOpen(false);
  }

  // Close  popup
const closePopup = () => {
  setSubOrItemOpen(false);
  };

//add popup open
const handleAdd=()=>{
  console.warn("add popup open");
setAddPopupOpen(true);
}

// Close add popup
const closeAddPopup = () => {
setAddPopupOpen(false);
};

//add item
const add=(name)=>{
  
  const data={
    
    "menu":mid,
    "name":name,
   
  }

  console.warn(data);
  CategoryService.addCategory(data).then(res=>{
    console.warn(res.data);
    if(res.data==true){
      setAddPopupOpen(false);
    setSuccessPopupOpen(true);
    
   
  }
  })

}

//close success popup
const closeSuccessPopup=()=>{
setSuccessPopupOpen(false);
window.location.reload();
}

//update item
const handleEdit=(category)=>{
setCategoryToUpdate(category);
setUpdatePopupOpen(true);
}

// Update type
const update = (id,name) => {

const data={
  "id":id,
  "name":name,
   }

   console.warn(data);
// Perform the update action 
CategoryService.updateCategory(id,data).then(res=>{
    console.log(res.data);
    if(res.data==true){
        setUpdatePopupOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
  })
// Close the popup
setUpdatePopupOpen(false);

};

// ...

// Close update popup
const closeUpdatePopup = () => {
setUpdatePopupOpen(false);
};

//delete item
const handleDelete=(scid)=>{
console.warn("open delete popup");
setCategoryId(scid);
setDeletePopupOpen(true);
}

// Confirm delete
const confirmDelete = () => {
// Perform the delete action
// You can use the `vacancyId` variable here to perform the delete action
console.log('Deleting category with ID: ' + categoryId);
// Close the popup
setDeletePopupOpen(false);
CategoryService.deleteCategory(categoryId).then(res=>{
  console.log(res.data);
  if(res.data==true){
    setSuccessPopupOpen(true);
   
  }
})

};
  return (
    <div className='menu' 
    style={{
      background: background.startsWith('#') ? background : `url(${background}) center center / cover no-repeat`,
    }}>
      <div className='menu-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{menuName}</h1>
            </div>
        </div>
        <div className='row'>
            <div className='col' style={{ textAlign:'right' }}>
            <IconButton onClick={() => handleAdd()}>
                      <AddBoxIcon />
            </IconButton>
            </div>
        </div>
        <div className='row' style={{ margin:'25px' }}>
          {categories.map((category) => (
            <div key={category.id}
            className='col'
            style={{ textAlign: 'center' }}
            >
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '20rem' }}>
              {category.bannerImg && (
  <Card.Img variant="top" src={category.bannerImg} style={{ height: '20rem' }} />
)}
                <Card.Body>
                    <div className='row' onClick={() => handleCardClick(category.id)}
            role="button">
                        <div className='col' style={{ textAlign:'center' }}>
                            <h3>{category.name}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col' style={{ textAlign:'center' }}>
                        <IconButton onClick={() => handleEdit(category)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(category.id)}>
                          <DeleteIcon />
                        </IconButton>
                        </div>
                    </div>
                  
                </Card.Body>
              </Card>
            </div>
            </div>
          ))}
        </div>
      </div>
      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfull"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isAddPopupOpen && (
        <AddPopup
          add={add}
          closePopup={closeAddPopup}
          title="Category"
        />
      )}

      {/* Delete item Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to delete this Category?"
        />
      )}
{/* update item Popup */}
{isUpdatePopupOpen && categoryToUpdate && (
        <UpdatePopup
          data={categoryToUpdate}
          update={update}
          closePopup={closeUpdatePopup}
          title="Category"
        />
      )}

      {/*  Add Popup */}
      {isSubOrItemOpen && (
        <SubCategoryOrItemPopup
          choose={choose}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default MenuPage;
