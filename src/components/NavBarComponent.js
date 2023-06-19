import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import BranchService from '../services/BranchService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SuccessComponent from '../components/SuccessComponent';
import DeletePopup from '../components/DeletePopup';
import AddBranchPopup from './AddBranchPopup';
import UpdateBranchPopup from './UpdateBranchPopup';

function NavBarComponent() {
    
    const [branches,setBranches]=useState([]);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen,setUpdatePopupOpen]=useState(false);
  const [branchToUpdate,setBranchToUpdate]=useState(null);
  const [branchId,setBranchId]=useState(0);

    const navigate = useNavigate();

    

  useEffect(() => {
    const businessId = sessionStorage.getItem('userId');
    console.warn('business   '+businessId);
    getBranchesByBusinessId(businessId);
    
  }, []);

  const getBranchesByBusinessId=(id)=> {
    console.warn("business id: "+id);
    BranchService.getBranchesByBusinessId(id).then(res=>{
      console.warn(res.data);
      setBranches(res.data);

    })

  }

   //navigate to branch
   const navigateToBranch = (id) => {
    navigate('/branch/'+id);
  };

  const addBranch=()=>{
console.warn("add popup open");
setAddPopupOpen(true);
  }

  // Close add popup
const closeAddPopup = () => {
  setAddPopupOpen(false);
  };
  
  //add item
  const add=(name)=>{
    const businessID = sessionStorage.getItem('userId');
    const data={
      
      "business":businessID,
      "name":name,
     
    }
  
    console.warn(data);
    BranchService.addBranch(data).then(res=>{
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
  navigate('/home');
  }
  
  const logout =()=>{
sessionStorage.clear();
navigate('/');
  }

  const navigateToProfile=()=>{
    navigate('/profile');
  }

  //update item
const handleEdit=(branch)=>{
  setBranchToUpdate(branch);
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
  BranchService.updateBranch(id,data).then(res=>{
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
  const handleDelete=(bid)=>{
  console.warn("open delete popup");
  setBranchId(bid);
  setDeletePopupOpen(true);
  }
  
  // Confirm delete
  const confirmDelete = () => {
  // Perform the delete action
  console.log('Deleting branch with ID: ' + branchId);
  // Close the popup
  setDeletePopupOpen(false);
  BranchService.deleteBranch(branchId).then(res=>{
    console.log(res.data);
    if(res.data==true){
      setSuccessPopupOpen(true);
     
    }
  })
  
  };
  

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
          <Navbar.Brand href="#home">MenuMaster</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <NavDropdown title="Branches" id="collasible-nav-dropdown">
                {branches.map((branch) => (
                  <NavDropdown.Item
                    key={branch.id}
                    onClick={() => navigateToBranch(branch.id)}
                  >
                    {branch.name}
                    <IconButton onClick={() => handleEdit(branch)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(branch.id)}>
                          <DeleteIcon />
                        </IconButton>
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => addBranch()}>
                  Add New Branch
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              
              <NavDropdown alignRight title={<AccountCircleIcon />} id="collasible-nav-dropdown">
              
                {/* Profile options */}
                <NavDropdown.Item onClick={() => navigateToProfile()}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    {/* success  Popup */}
    {isSuccessPopupOpen && (
        <SuccessComponent
          message="Successfull"
          closeSuccessPopup={closeSuccessPopup}
        />
      )}

      {/*  Add Popup */}
      {isAddPopupOpen && (
        <AddBranchPopup
          add={add}
          closePopup={closeAddPopup}
          title="Branch"
        />
      )}

      {/* Delete branch Popup */}
      {isDeletePopupOpen && (
        <DeletePopup
          confirmDelete={confirmDelete}
          closePopup={() => setDeletePopupOpen(false)}
          message="Are you sure, Do you want to delete this Branch?"
        />
      )}
{/* update branch Popup */}
{isUpdatePopupOpen && branchToUpdate && (
        <UpdateBranchPopup
          data={branchToUpdate}
          update={update}
          closePopup={closeUpdatePopup}
          title="Branch"
        />
      )}
    </div>
  );
}

export default NavBarComponent;