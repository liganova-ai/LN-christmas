'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Layout from '../components/Layout';
import Button from '../components/Button';


const genders = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Diverse', label: 'Diverse' },
];
const facialFeatures = [
  { value: 'long Beard', label: 'Long Beard' },
  { value: 'short Beard', label: 'Short Beard' },
  { value: 'Mustache', label: 'Mustache' },
  { value: 'Glasses', label: 'Glasses' },
  { value: 'Freckles', label: 'Freckles' },
  { value: 'Birthmark', label: 'Birthmark' },
  { value: 'a Hat', label: 'Hat' },
  { value: 'Piercings', label: 'Piercings' },
  { value: 'No Specific Features', label: 'No Specific Features' },
];
const hairLengths = [
  { value: 'Short', label: 'Short' },
  { value: 'Shoulder-length', label: 'Medium' },
  { value: 'Long', label: 'Long' },
  { value: 'Bald', label: 'Bald' },
  { value: 'Shaved', label: 'Shaved' },
];
const hairColors = [
  { value: 'Black', label: 'Black' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Blonde', label: 'Blonde' },
  { value: 'Red', label: 'Red' },
  { value: 'Gray', label: 'Gray' },
  { value: 'colored', label: 'Colored' },
];

export default function PersonaPage() {
    const router = useRouter();
    const [persona, setPersona] = useState({
      gender: [],
      facialFeatures: [],
      hairLength: [],
      hairColor: [],
    });
  
    // Handle selection changes
    const handleSelection = (field, selectedOptions) => {
      setPersona((prev) => ({
        ...prev,
        [field]: selectedOptions.map((option) => option.value), // Store array of selected values
      }));
    };
  
    // Proceed to the next page
    const proceedToTheme = () => {
      const { gender, facialFeatures, hairLength, hairColor } = persona;
  
      // Validate all fields have at least one selection
      if (
        gender.length === 0 ||
        facialFeatures.length === 0 ||
        hairLength.length === 0 ||
        hairColor.length === 0
      ) {
        alert('Please select at least one option from each dropdown before proceeding.');
        return;
      }
  
      // Save persona to localStorage
      localStorage.setItem('persona', JSON.stringify(persona));
      router.push('/theme');
    };
  
    const dropdownContent = (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label>Gender:</label>
            <Select
              options={genders}
              isMulti
              onChange={(selected) => handleSelection('gender', selected || [])}
              placeholder="Select Gender"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Facial Features:</label>
            <Select
              options={facialFeatures}
              isMulti
              onChange={(selected) => handleSelection('facialFeatures', selected || [])}
              placeholder="Select Facial Features"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Hair Length:</label>
            <Select
              options={hairLengths}
              isMulti
              onChange={(selected) => handleSelection('hairLength', selected || [])}
              placeholder="Select Hair Length"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Hair Color:</label>
            <Select
              options={hairColors}
              isMulti
              onChange={(selected) => handleSelection('hairColor', selected || [])}
              placeholder="Select Hair Color"
            />
          </div>
        </div>
      );
    
      return (
        <Layout
          heading="Persona"
          copyText="By telling us more about yourself, your image will get more accurate."
          rightContent={dropdownContent}
        >
          <Button onClick={proceedToTheme}>Next</Button>
        </Layout>
      );
    }
