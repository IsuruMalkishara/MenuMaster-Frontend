import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CategoryService from '../services/CategoryService';
import SubCategoryService from '../services/SubCategoryService';
import AddPopup from '../components/AddPopup';
import DeletePopup from '../components/DeletePopup';
import UpdatePopup from '../components/UpdatePopup';
import SuccessComponent from '../components/SuccessComponent';
import '../styles/SubCategoryPage.css';

function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName,setCategoryName]=useState('');
  const [categoryId,setCategoryId]=useState('');
  const [categoryToUpdate,setCategoryToUpdate]=useState(null);

  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);

  const { id,mid,cid } = useParams();

  const navigate=useNavigate();

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

  //click sub category
  const handleCardClick=(sid)=>{
      
    navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/sub/'+sid);
      
  }

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
      
      "category":cid,
      "name":name,
     
    }

    console.warn(data);
    SubCategoryService.addSubCategory(data).then(res=>{
      console.warn(res.data);
      if(res.data.result==true){
        setAddPopupOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
    })

  }

  //close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/sub');
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
    "category":cid,
      "name":name,
     }
  
     console.warn(data);
  // Perform the update action 
  SubCategoryService.updateSubCategory(id,data).then(res=>{
      console.log(res.data);
      if(res.data.result==true){
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
  console.log('Deleting sub category with ID: ' + categoryId);
  // Close the popup
  setDeletePopupOpen(false);
  SubCategoryService.deleteSubCategory(categoryId).then(res=>{
    console.log(res.data);
    if(res.data.result==true){
      setSuccessPopupOpen(true);
     
    }
  })
  
};

  return (
    <div className='sub-category'>
      <div className='sub-category-content'>
        <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{categoryName}</h1>
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
          {subCategories.map((category) => (
            <div key={category.id} className='col' style={{ textAlign:'center' }} 
            role="button">
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '35rem' }}>
                <Card.Body>
                    <div className='row' onClick={() => handleCardClick(category.id)}>
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
          
        />
      )}

      {/* Delete item Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to delete this Item?"
        />
      )}
{/* update item Popup */}
{isUpdatePopupOpen && categoryToUpdate && (
        <UpdatePopup
          data={categoryToUpdate}
          update={update}
          closePopup={closeUpdatePopup}
          
        />
      )}
    </div>
  );
}

export default SubCategoryPage;
