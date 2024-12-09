'use client';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { useState, useRef } from 'react';

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

  const retakePhoto = () => {
    setImage(null); // Reset the image to retake the photo
  };

  const proceedToTheme = () => {
    if (image) {
      console.log("Navigating to persona page...");
      // Store the image in localStorage
      localStorage.setItem('uploadedImage', image);
      router.push('/persona');
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload or Take a Photo</h1>
      {!image ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={capturePhoto}>Take Photo</button>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </>
      ) : (
        <>
          <img src={image} alt="Preview" />
          <div>
            <button onClick={retakePhoto}>Retake Photo</button>
            <button onClick={proceedToTheme}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
