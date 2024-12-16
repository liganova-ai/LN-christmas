"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from './upload.module.css';
import Logo from '../components/logo';

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

  const proceedToTheme = () => {
    if (image) {
      localStorage.setItem('uploadedImage', image);
      router.push('/persona');
    }
  };

  return (
    <div className={styles.uploadPage}>
      <header className={styles.header}>
        <Logo color="red" />
      </header>
      <Layout
        heading="Una Foto"
        headingColor="#F3DF6E"
        copyText="To get the best output from this image generator, ensure good light conditions. Avoid hats or sunglasses, and smile for the best results."
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
              <Button onClick={() => document.getElementById('fileUpload').click()}>
                Upload Picture
              </Button>
            </>
          ) : (
            <>
              <Button onClick={retakePhoto}>Retake Photo</Button>
              <Button onClick={proceedToTheme}>Use Photo</Button>
            </>
          )}
        </div>
      </Layout>
    </div>
  );  
}
