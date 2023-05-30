import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuService from '../services/MenuService';
import '../styles/MenuPage.css';

function BranchPage() {
  const [branchName, setBranchName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [businessName, setBusinessName] = useState('');
  

  const { mid } = useParams();

  useEffect(() => {
    

  }, []);

  

  

  

  return (
    <div className='menu'>
      <div className='menu-content'>
      
        
       Menu {mid}

        
      </div>
    </div>
  );
}

export default BranchPage;
