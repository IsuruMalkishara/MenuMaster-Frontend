import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BranchService from '../services/BranchService';
import AddPopup from '../components/AddPopup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SuccessComponent from '../components/SuccessComponent';

function NavBarComponent() {
    
    const [branches,setBranches]=useState([]);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen]=useState(false);

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
      if(res.data.result==true){
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
        <AddPopup
          add={add}
          closePopup={closeAddPopup}
          title="Branch"
        />
      )}
    </div>
  );
}

export default NavBarComponent;