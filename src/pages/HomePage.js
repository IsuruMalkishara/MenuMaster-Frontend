import React, {useState,useEffect } from 'react';
import '../styles/HomePage.css';

function HomePage() {

  const [businessId,setBusinessId]=useState(null);
  
  useEffect(() => {  
    var userId = sessionStorage.getItem('userId');
    setBusinessId(userId);
    console.warn("user id "+businessId);
  }, []);

  
  return (
    <div className='home'>
    
        <div className='menumaster'><h1>MenuMaster</h1></div>
      
    </div>
  )
}

export default HomePage
