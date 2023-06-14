import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import jsPDF from 'jspdf';
import BranchService from '../services/BranchService';
import MenuService from '../services/MenuService';
import AddPopup from '../components/AddPopup';
import DeletePopup from '../components/DeletePopup';
import UpdatePopup from '../components/UpdatePopup';
import SuccessComponent from '../components/SuccessComponent';
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

  const { id } = useParams();

  const navigate=useNavigate();

  useEffect(() => {
    getBranchDataById();
    getMenusByBranchId();
  }, []);

  const getBranchDataById = () => {
    console.warn('branch ' + id);
    BranchService.getBranchById(id)
      .then((res) => {
        console.warn(res.data);
        setBranchName(res.data.name);
        setQrCode(res.data.qrCode);
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

  const handleDownload = () => {
    console.warn('download');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      // Draw branchName and businessName on the canvas
      context.fillStyle = '#000000';
      context.font = '20px Arial';
      context.fillText(businessName, 10, img.height - 30);
      context.fillText(branchName, 10, img.height - 20);

      const dataUrl = canvas.toDataURL('image/png');

      // Create a PDF document
      const pdf = new jsPDF();
      pdf.addImage(dataUrl, 'PNG', 10, 10, 190, img.height * (190 / img.width));

      // Download the PDF file
      pdf.save(`${branchName}_${businessName}.pdf`);
    };

    img.src = qrCode;
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
const add=(name)=>{
  
  const data={
    
    "branch":id,
    "name":name,
   
  }

  console.warn(data);
  MenuService.addMenu(data).then(res=>{
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
navigate('/branch/'+id);
}

//update item
const handleEdit=(menu)=>{
setMenuToUpdate(menu);
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
MenuService.updateMenu(id,data).then(res=>{
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
  if(res.data.result==true){
    setSuccessPopupOpen(true);
   
  }
})

};

  return (
    <div className='branch'>
      <div className='branch-content'>
      
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
                    <img src={qrCode} alt='QR Code' height={'100px'} width={'100px'} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col' style={{ textAlign: 'center' }}>
                    <Button className='download-btn' variant='primary' type='submit' onClick={handleDownload}>
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
              <Card className='category-card' style={{backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '35rem' }}>
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
    </div>
  );
}

export default BranchPage;
