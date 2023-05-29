import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BranchService from '../services/BranchService';

function NavBarComponent() {
    
    const [branches,setBranches]=useState([]);
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

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MenuMaster</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Branches" id="collasible-nav-dropdown">
            {branches.map((branch) => (
                <NavDropdown.Item key={branch.id} onClick={() => navigateToBranch(branch.id)}>
                  {branch.name}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Add New Branch
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">Profile</Nav.Link> */}
            <Nav.Link eventKey={2} href="#memes">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;