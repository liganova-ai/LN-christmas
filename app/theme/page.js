'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const themes = ['Christmas', 'Bahamas', 'Cyberpunk', 'Vintage'];

export default function ThemePage() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleThemeSelection = async (theme) => {
    if (!image) {
      alert('Image not found! Please upload or capture an image first.');
      return;
    }



    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: theme, main_face_image: image }),
      });
      console.log("Sending image to API:", image); // Debugging: Ensure correct data flow
      const prediction = await response.json();

      if (response.status !== 201) {
        alert(`Error: ${prediction.detail}`);
        return;
      }

      localStorage.setItem('predictionId', prediction.id);
      router.push('/result');
    } catch (error) {
      console.error('Error during theme selection:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="theme-page">
      <h1>Select a Theme</h1>
      {image ? (
        <>
          <img src={image} alt="Uploaded or Captured" />
          {themes.map((theme) => (
            <button key={theme} onClick={() => handleThemeSelection(theme)}>
              {theme}
            </button>
          ))}
        </>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
