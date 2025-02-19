"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from './upload.module.css';
import Logo from '../components/logo';
import imageCompression from 'browser-image-compression';

export default function UploadPage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setImage(photo);
  };

  const handleUpload = (event) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  const retakePhoto = () => setImage(null);

  const proceedToTheme = async () => {
    if (image) {
      try {
        // Compress the image
        const options = {
          maxSizeMB: 4, // Maximum size in MB
          maxWidthOrHeight: 1024, // Resize to a maximum width or height
          useWebWorker: true, // Use web worker for better performance
        };
        const compressedFile = await imageCompression(dataURItoBlob(image), options);
        const compressedImage = await blobToBase64(compressedFile);
  
        // Send compressed image to the server
        const response = await fetch("/.netlify/functions/save_image", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uploadedImage: compressedImage, generatedImage: '' }),
        });
  
        if (!response.ok) {
          const errorDetails = await response.text();
          console.error('Server response:', errorDetails);
          alert(`Error uploading image to the server. Status: ${response.status}`);
          return;
        }
  
        const data = await response.json();
        console.log('Image saved successfully:', data);
        localStorage.setItem('uploadedImage', image)
        localStorage.setItem('uploadedImageId', data.id);
        router.push('/persona');
      } catch (error) {
        console.error('Network or server error:', error);
        alert('Error uploading image to the server.');
      }
    }
  };
  
  // Helper to convert Data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
  
  // Helper to convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className={styles.uploadPage}>
      <header className={styles.header}>
        <Logo color="red" />
      </header>
      <Layout
        heading="Una Foto"
        headingColor="#F3DF6E"
        copyText={`
          To get the best output, please consider the following:<br>
          1. One person in the image.<br>
          2. Aim for good light conditions.<br>
          3. Don't wear sunglasses or hats.<br>
          4. Smile!
        `}
        copyTextColor="#F3DF6E"
        middleContent={
          <div className={styles.webcamContainer}>
            {!image ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={styles.webcam}
                videoConstraints={{
                  width: 480,
                  height: 640, 
                  facingMode: "user", 
                }}
              />
            ) : (
              <img
                src={image}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>
        }
      >
        <div className={styles.footer}>
          {!image ? (
            <>
              <Button onClick={capturePhoto}>Take Selfie</Button>
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
            </>
          ) : (
            <>
              <Button onClick={retakePhoto}>Try again</Button>
              <Button onClick={proceedToTheme}>Use Photo</Button>
            </>
          )}
        </div>
      </Layout>
    </div>
  );  
}