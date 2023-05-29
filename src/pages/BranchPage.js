import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import BranchService from '../services/BranchService';
import '../styles/BranchPage.css';

function BranchPage() {
  const [branchName, setBranchName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [businessName, setBusinessName] = useState('');
  

  const { id } = useParams();

  useEffect(() => {
    getBranchDataById();

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
          <div className='col' style={{ textAlign: 'center' }}>
            <Card className='qr-card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.301)', width: '25rem' }}>
              <Card.Body>
                <div className='row'>
                  <div className='col' style={{ textAlign: 'center' }}>
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

        
      </div>
    </div>
  );
}

export default BranchPage;
