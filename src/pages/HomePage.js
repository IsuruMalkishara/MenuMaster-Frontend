import React, {useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GradientIcon from '@mui/icons-material/Gradient';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import BackgroundService from '../services/BackgroundService';
import SuccessComponent from '../components/SuccessComponent';
import '../styles/HomePage.css';
import BackgroundSelector from '../components/BackgroundSelector';
import DeletePopup from '../components/DeletePopup';

function HomePage() {

  const [businessId,setBusinessId]=useState(null);
  const [background,setBackground]=useState('linear-gradient(to right, rgb(47, 102, 86), rgb(89, 1, 92))');
  const [isBackgroundSelectorOpen,setBackgroundSeletorOpen]=useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  const [isDeletePopupOpen,setDeletePopupOpen]=useState(false);

  const navigate=useNavigate();
  
  useEffect(() => {  
    var userId = sessionStorage.getItem('userId');
    setBusinessId(userId);
    console.warn("user id "+businessId);
    getBackground(userId);
  }, []);

  //get background
  const getBackground=(id)=>{
  BackgroundService.getBackground(id).then(res=>{
    console.warn(res.data.background);
    setBackground(res.data.background);
  })
  }

  //change background 
  const handleChangeBackground=()=>{
    console.warn("background selector open");
 setBackgroundSeletorOpen(true);
}

// Close change background popup
const closeBackgroundSelector = () => {
setBackgroundSeletorOpen(false);
};

  //change
  const change=(background)=>{
    const businessId=sessionStorage.getItem('userId');
    const data={
      "business":businessId,
      "background":background
    }

    console.warn(data);
    BackgroundService.updateBackground(businessId, data).then(res=>{
      console.warn(res.data);
      if(res.data.result==true){
        setBackgroundSeletorOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
    })

  }

  //close success popup
const closeSuccessPopup=()=>{
  setSuccessPopupOpen(false);
  navigate('/home');
}

const handleRemoveBackground=()=>{
  console.warn("open delete popup");
  setDeletePopupOpen(true);
}

// Confirm delete
const confirmDelete = () => {
  // Perform the delete action
  const businessId=sessionStorage.getItem('userId');
  console.log('Deleting background with ID: ' + businessId);
  // Close the popup
  setDeletePopupOpen(false);
  BackgroundService.removeBackground(businessId).then(res=>{
    console.log(res.data);
    if(res.data.result==true){
      setSuccessPopupOpen(true);
     
    }
  })
  
};
  
  return (
    <div className='home' style={{ background:background }}>
      <div className='home-content'>
       <div className='row'>
        <div className='col' style={{ textAlign:'right' }}>
        <IconButton onClick={() => handleChangeBackground()}>
                      <GradientIcon />
            </IconButton>
            <IconButton onClick={() => handleRemoveBackground()}>
                      <DeleteIcon />
            </IconButton>
        </div>
       </div>
    <div className='row'>
        <div className='menumaster' ><h1>MenuMaster</h1></div>
    </div>    
    </div>
      {/* success  Popup */}
      {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfully Change Background"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isBackgroundSelectorOpen && (
        <BackgroundSelector
          change={change}
          closePopup={closeBackgroundSelector}
         
        />
      )}
      {/* Delete item Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to remove background?"
        />
      )}

    </div>

  )
}

export default HomePage
