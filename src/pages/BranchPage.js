import React, { useState, useEffect,useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradientIcon from '@mui/icons-material/Gradient';
import IconButton from '@mui/material/IconButton';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import BranchService from '../services/BranchService';
import MenuService from '../services/MenuService';
import AddPopup from '../components/AddPopup';
import DeletePopup from '../components/DeletePopup';
import UpdatePopup from '../components/UpdatePopup';
import SuccessComponent from '../components/SuccessComponent';
import BackgroundSelector from '../components/BackgroundSelector';
import BackgroundService from '../services/BackgroundService';
import '../styles/BranchPage.css';

function BranchPage() {
  const [branchName, setBranchName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [menus, setMenus] = useState([]);
  const [menuId,setMenuId]=useState('');
  const [menuToUpdate,setMenuToUpdate]=useState(null);

  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);

  const [background,setBackground]=useState('linear-gradient(to right, rgb(47, 102, 86), rgb(89, 1, 92))');
  const [isBackgroundSelectorOpen,setBackgroundSeletorOpen]=useState(false);
  const [isDeleteBackgroundPopupOpen,setDeleteBackgroundPopupOpen]=useState(false);

  const qrCodeValue = qrCode; // Replace with your QR code value
  const canvasRef = useRef(null);
  const version = 10;

  const { id } = useParams();

  const navigate=useNavigate();



  useEffect(() => {
    getBranchDataById();
    getMenusByBranchId();
    getBackground(id);
  }, []);

  const getBranchDataById = () => {
    console.warn('branch ' + id);
    BranchService.getBranchById(id)
      .then((res) => {
        console.warn(res.data);
        console.warn("qr code: "+res.data.qrcode);
        setBranchName(res.data.name);
        setQrCode(res.data.qrcode);
        setBusinessName(res.data.business.name);
      })
      .catch((error) => {
        // Handle error
      });
  };

// get menus
const getMenusByBranchId = () => {
  MenuService.getMenusByBranchId(id)
    .then((res) => {
      console.warn(res.data);
      setMenus(res.data);
    })
    .catch((error) => {
      // Handle error
    });
};


  

  const downloadImage = () => {
    console.warn("Download qr code");
    const canvas = document.getElementById('qrcode-canvas');
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qrcode.png';
    link.click();

    console.warn("Downloaded qr code");
  };

  
  

  //click sub category
  
  
  const handleCardClick=(mid)=>{
      
    navigate('/branch/'+id+'/menu/'+mid);
      
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
const add=(name,bannerImg)=>{
  
  const data={ 
    "branch":id,
    "name":name,
    "bannerImg":bannerImg
  }

  console.warn(data);
  MenuService.addMenu(data).then(res=>{
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
const handleEdit=(menu)=>{
setMenuToUpdate(menu);
setUpdatePopupOpen(true);
}

// Update type
const update = (id,name,bannerImg) => {

const data={
  "id":id,
  "name":name,
  "bannerImg":bannerImg,
  
   }

   console.warn(data);
// Perform the update action 
MenuService.updateMenu(id,data).then(res=>{
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
const handleDelete=(mid)=>{
console.warn("open delete popup");
setMenuId(mid);
setDeletePopupOpen(true);
}

// Confirm delete
const confirmDelete = () => {
// Perform the delete action
// You can use the `vacancyId` variable here to perform the delete action
console.log('Deleting menu with ID: ' + menuId);
// Close the popup
setDeletePopupOpen(false);
MenuService.deleteMenu(menuId).then(res=>{
  console.log(res.data);
  if(res.data==true){
    setSuccessPopupOpen(true);
   
  }
})

};

//get background
const getBackground=(id)=>{
  BackgroundService.getBackgrountOfBranch(id).then(res=>{
    console.warn(res.data.background);
    if(res.data.background!==null){
      setBackground(res.data.background);
    }
   
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
   
    const data={
      "id":id,
      "background":background
    }

    console.warn(data);
    BackgroundService.updateBackgroundOfBranch(id, data).then(res=>{
      console.warn(res.data);
      if(res.data==true){
        setBackgroundSeletorOpen(false);
      setSuccessPopupOpen(true);
      
     
    }
    })

  }

  const handleRemoveBackground=()=>{
    console.warn("open delete popup");
    setDeleteBackgroundPopupOpen(true);
  }
  
  // Confirm delete
  const confirmDeleteBackground = () => {
    // Perform the delete action
    
    console.log('Deleting background with ID: ' + id);
    // Close the popup
    setDeleteBackgroundPopupOpen(false);
    BackgroundService.removeBackgroundOfBranch(id).then(res=>{
      console.log(res.data);
      if(res.data==true){
        setSuccessPopupOpen(true);
       
      }
    })
    
  };
    
  return (
    <div className='branch' 
    style={{
      background: background.startsWith('#') ? background : `url(${background}) center center / cover no-repeat`,
    }}>
      <div className='branch-content'>
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
          <div className='col' style={{ textAlign: 'center' }}>
            <h1> {businessName}</h1>
            <h2> {branchName}</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col d-flex justify-content-center' >
            <Card className='qr-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
              
              <Card.Body>
                <div className='row'>
                  <div className='col' style={{ textAlign:'center' }}>
                  <QRCode id="qrcode-canvas" value={qrCode} size={200} level="L" qrStyle="dots" qrVersion={version} />
                  </div>
                
      
                </div>
                <div className='row'>
                  <div className='col' style={{ textAlign: 'center' }}>
                    <Button className='download-btn' variant='primary' type='submit' onClick={downloadImage}>
                      Download QR Code
                    </Button>
                  </div>
                </div>
                
                
              </Card.Body>
            </Card>
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
          {menus.map((menu) => (
            <div key={menu.id}
            className='col'
            style={{ textAlign: 'center' }}
            >
                <div >
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '20rem' }}>
              {menu.bannerImg && (
  <Card.Img variant="top" src={menu.bannerImg} style={{ height: '20rem' }} />
)}
                <Card.Body>
                    <div className='row' onClick={() => handleCardClick(menu.id)}
            role="button">
                        <div className='col' style={{ textAlign:'center' }}>
                            <h3>{menu.name}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col' style={{ textAlign:'center' }}>
                        <IconButton onClick={() => handleEdit(menu)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(menu.id)}>
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
          title="Menu"
        />
      )}

      {/* Delete item Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to delete this Menu?"
        />
      )}
{/* update item Popup */}
{isUpdatePopupOpen && menuToUpdate && (
        <UpdatePopup
          data={menuToUpdate}
          update={update}
          closePopup={closeUpdatePopup}
          title="Category"
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
      {isDeleteBackgroundPopupOpen && (
        <DeletePopup
          confirmDelete={confirmDeleteBackground}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to remove background?"
        />
      )}

    </div>
  );
}

export default BranchPage;
