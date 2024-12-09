'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Layout from '../components/Layout';
import Button from '../components/Button';

const themes = ['Miami', 'Antarctica', 'Vietnam', 'Burning Man', 'African Safari'];

export default function ThemePage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [persona, setPersona] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    const storedPersona = localStorage.getItem('persona');

    if (storedImage) setImage(storedImage);
    if (storedPersona) setPersona(JSON.parse(storedPersona));
  }, []);

  const handleThemeSelection = async (selectedOption) => {
    if (!image) {
      alert('Image not found! Please upload or capture an image first.');
      return;
    }

    if (!persona) {
      alert('Persona details not found. Please restart.');
      return;
    }

    const { gender, facialFeatures, hairLength, hairColor } = persona;

    // Combine arrays into readable text for the prompt
    const combinedPrompt = `A ${gender.join(' or ')} person with ${facialFeatures.join(
      ', '
    )} and ${hairLength.join(' and ')} ${hairColor.join(
      ' and '
    )} hair standing in front of scene typical for ${selectedOption.value}`;

    console.log('Final Prompt:', combinedPrompt);

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

  // Dropdown content
  const themeOptions = themes.map((theme) => ({ value: theme, label: theme }));

  const dropdownContent = (
    <Select
      options={themeOptions}
      onChange={handleThemeSelection}
      placeholder="Select Travel Destination"
    />
  );

  return (
    <Layout
      heading="Scene"
      copyText="Now comes the important part. In which travel destination will you envision yourself next?"
      rightContent={dropdownContent}
    >
      <div className="left-content">
        {image ? (
          <>
            <Button onClick={() => handleThemeSelection(selectedTheme)}>Next</Button>
          </>
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </Layout>
  );
}
