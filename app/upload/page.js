'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Layout from '../components/Layout';
import Button from '../components/Button';

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

  const rightContent = (
    <>
      {!image ? (
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      ) : (
        <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '12px' }} />
      )}
    </>
  );

  return (
    <Layout
      heading="Take a selfie"
      copyText="Use your webcam to take a selfie. The expression you have in the image will be translated into the AI art."
      rightContent={rightContent}
    >
      {!image ? (
        <>
          <div style={{ display: 'flex',flexDirection: 'column',  gap: '10px' }}>
            <Button onClick={capturePhoto} style={{ width: '100%' }}>Take Picture</Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{
                display: 'none',  // Hide the default file input
              }}
            />
            <Button onClick={() => document.querySelector('input[type="file"]').click()} style={{ width: '100%' }} >Upload a Picture</Button>
          </div>
        </>
      ) : (
        <>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={retakePhoto} style={{ width: '100%' }} >Retake Photo</Button>
          <Button onClick={proceedToTheme} style={{ width: '100%' }}>Use Photo</Button>
          </div>
        </>
      )}
    </Layout>
  );
}
