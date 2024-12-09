'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


// themes = buttons on page, theme_specification = corelating prompt input
const themes = ['Desert and Dunes', 'Beach Vacation' , 'Berlin Televison Tower'];
const theme_specification = ['sand dunes with impresisve Pyramids of Giza in the background'] // prompt behind the buttons 

export default function ThemePage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    const storedPersona = localStorage.getItem('persona');

    if (storedImage) setImage(storedImage);
    if (storedPersona) setPersona(JSON.parse(storedPersona));
  }, []);

  const handleThemeSelection = async (theme) => {
    if (!image) {
      alert('Image not found! Please upload or capture an image first.');
      return;
    }

    if (!persona) {
      alert('Persona details not found. Please restart.');
      return;
    }

    const { gender, facialFeature, hairLength, hairColor } = persona;

    const combinedPrompt = `A ${gender} person with ${facialFeature} and ${hairColor} ${hairLength} hair standing in front of scene typcial for ${theme}  `;
    console.log("Final Prompt:", combinedPrompt);

    
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: combinedPrompt, main_face_image: image }),
      });
      const prediction = await response.json();

      if (response.status !== 201) {
        alert(`Error: ${prediction.detail}`);
        return;
      }

      // save and send prediction id to result page 
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
