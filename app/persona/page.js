'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const genders = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
];
const facialFeatures = [
  { value: 'Beard', label: 'Beard' },
  { value: 'Glasses', label: 'Glasses' },
  { value: 'Freckles', label: 'Freckles' },
  { value: 'No Specific Features', label: 'No Specific Features' },
];
const hairLengths = [
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Long', label: 'Long' },
];
const hairColors = [
  { value: 'Black', label: 'Black' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Blonde', label: 'Blonde' },
  { value: 'Red', label: 'Red' },
  { value: 'Gray', label: 'Gray' },
];

export default function PersonaPage() {
  const router = useRouter();
  const [persona, setPersona] = useState({
    gender: [],
    facialFeatures: [],
    hairLength: [],
    hairColor: [],
  });

  const handleSelection = (field, selectedOptions) => {
    setPersona((prev) => ({
      ...prev,
      [field]: selectedOptions.map((option) => option.value), // Store array of selected values
    }));
  };

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

  return (
    <div className="persona-page">
      <h1>Select Persona Details</h1>

      <div className="dropdown-container">
        <label>Gender:</label>
        <Select
          options={genders}
          isMulti
          onChange={(selected) => handleSelection('gender', selected || [])}
          placeholder="Select Gender"
        />
      </div>

      <div className="dropdown-container">
        <label>Facial Features:</label>
        <Select
          options={facialFeatures}
          isMulti
          onChange={(selected) => handleSelection('facialFeatures', selected || [])}
          placeholder="Select Facial Features"
        />
      </div>

      <div className="dropdown-container">
        <label>Hair Length:</label>
        <Select
          options={hairLengths}
          isMulti
          onChange={(selected) => handleSelection('hairLength', selected || [])}
          placeholder="Select Hair Length"
        />
      </div>

      <div className="dropdown-container">
        <label>Hair Color:</label>
        <Select
          options={hairColors}
          isMulti
          onChange={(selected) => handleSelection('hairColor', selected || [])}
          placeholder="Select Hair Color"
        />
      </div>

      <button onClick={proceedToTheme}>Next</button>
    </div>
  );
}
