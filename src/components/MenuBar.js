import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MenuService from '../services/MenuService';
import BranchService from '../services/BranchService';

function MenuBar() {
  
  const [menus, setMenus] = useState([]);
  const [branchName, setBranchName] = useState('');
  const { id } = useParams();

  const navigate=useNavigate();

  useEffect(() => {
    getBranchDataById();
    getMenusByBranchId();
  }, []);

  //get branch data
  const getBranchDataById = () => {
    console.warn('branch ' + id);
    BranchService.getBranchById(id)
      .then((res) => {
        console.warn(res.data);
        setBranchName(res.data.name);
        
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

  const onClickHome=()=>{
    navigate('/branch/'+id);
  }

  const onClickMenu=(mid)=>{
    navigate('/branch/'+id+'/menu/'+mid);
  }
  return (
    
            <Navbar bg='light' expand='lg'>
              <Container>
                <Navbar.Brand href='#home'>{branchName}</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='me-auto'>
                    <Nav.Link onClick={() => onClickHome()}>Branch</Nav.Link>
                    {menus.map((menu) => (
                      <Nav.Link onClick={() => onClickMenu(menu.id)}>
                        {menu.name}
                      </Nav.Link>
                    ))}
                    
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
         
  );
}

export default MenuBar;
