'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Layout from '../components/Layout';
import Button from '../components/Button';

const customStyles = {
  control: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    borderRadius: '30px',
    borderColor: '#ccc',
    minHeight: '50px',
    width: '400px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
  }),
  menu: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    width: '300px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#888',
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial, sans-serif',
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
  }),
};

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

  const themePrompts = {
    Miami: "Real photography of a [ethnie] [gender] person with [hair colour] [hair type] hair and [accessoires] wearing a shirt and walking with an ice cream on Muscle Beach Miami, in the background people using training stations children’s playing on playground and colorful beach houses, sun high up",
    Vietnam: "Real photography of a [ethnie] [gender] person with [hair colour] [hair type] hair and [accessoires] standing on rice terraces in Vietnam, traditional workers in the background, scenic mountain view with hundreds of rice field terraces, sun is shining through the mountains",
    Antarctica: "Real photography of a [ethnie] [gender] person with [hair colour] [hair type] hair  and [accessoires] wearing heavy tactile winter gear while standing on the front railing of an expedition ship, in the background are icebergs with dozens of penguins on top of the iceberg, some penguins jumping into the water, middle of Antarctica",
    "Burning Man": "Real photography of a [ethnie] [gender] person with [hair colour] [hair type] hair and [accessoires] posing in front of a Mad Max truck with dozens of people partying on top of the truck, racing in the desert through the Burning Man festival, tents surrounding the truck, night time shot",
    "African Safari": "Real photography of a [ethnie] [gender] person with [hair colour] [hair type] hair and [accessoires] wearing a Safari outfit and sitting inside a safari truck driving through the African savanna, an elephant family and African vegetation in the background",
  };


  const handleThemeSelection = async (selectedOption) => {
    if (!image) {
      alert('Image not found! Please upload or capture an image first.');
      return;
    }

    if (!persona) {
      alert('Persona details not found. Please restart.');
      return;
    }

    const { gender, facialFeatures, hairLength, hairColor, ethnicity } = persona;

    const selectedPrompt = themePrompts[selectedOption.value];

    const combinedPrompt = selectedPrompt
      .replace("[ethnie]", ethnicity.join(" or "))
      .replace("[gender]", gender.join(" or "))
      .replace("[hair colour]", hairColor.join(" and "))
      .replace("[hair type]", hairLength.join(" and "))
      .replace("[accessoires]", facialFeatures.join(", "));
  
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
    <div>
      <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Travel destination:</label>
      <Select
        options={themeOptions}
        onChange={handleThemeSelection}
        placeholder="Select Travel Destination"
        styles={customStyles} 
      />
    </div>
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
