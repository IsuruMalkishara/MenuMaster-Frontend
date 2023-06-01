import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import SubCategoryService from '../services/SubCategoryService';
import ItemService from '../services/ItemService';
import AddItemPopup from '../components/AddItemPopup';
import SuccessComponent from '../components/SuccessComponent';
import '../styles/ItemsPage.css';

function ItemsPage() {
  
  const [items, setItems] = useState([]);
  const [subCategoryName,setSubCategoryName]=useState('');
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  

  const { id,mid,cid,sid } = useParams();

  const navigate = useNavigate(); 

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

  //add popup open
  const handleAddItem=()=>{
    console.warn("add popup open");
 setAddPopupOpen(true);
}

// Close add popup
const closeAddPopup = () => {
setAddPopupOpen(false);
};

  //add item
  const add=(name,price,bannerImg)=>{
    const businessId=sessionStorage.getItem('userId');
    const data={
      "business":businessId,
      "branch":id,
      "menu":mid,
      "category":cid,
      "subCategory":sid,
      "name":name,
      "price":price,
      "bannerImg":bannerImg
    }

    console.warn(data);
    ItemService.addItem(data).then(res=>{
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
  navigate('/branch/'+id+'/menu/'+mid+'/category/'+cid+'/sub/'+sid);
}

  return (
    <div className='item'>
      <div className='item-content'>
      <div className='row'>
            <div className='col' style={{ textAlign:'center' }}>
                <h1>{subCategoryName}</h1>
            </div>
        </div>
        <div className='row'>
            <div className='col' style={{ textAlign:'right' }}>
            <IconButton onClick={() => handleAddItem()}>
                      <AddBoxIcon />
            </IconButton>
            </div>
        </div>
        <div className='row' style={{ margin:'25px' }}>
          {items.map((item) => (
            <div key={item.id} className='col' style={{ textAlign:'center' }}>
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '20rem' }}>
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
       {/* success  Popup */}
       {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully added new item"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isAddPopupOpen && (
        <AddItemPopup
          add={add}
          closePopup={closeAddPopup}
          name="Type"
        />
      )}
    </div>
    
  );
}

export default ItemsPage;
