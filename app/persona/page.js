'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Layout from '../components/Layout';
import Button from '../components/Button';

const genders = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
];
const facialFeatures = [
  { value: 'long Beard', label: 'Long Beard' },
  { value: 'short Beard', label: 'Short Beard' },
  { value: 'Make-up', label: 'Make-up' },
  { value: 'Glasses', label: 'Glasses' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Facial Tattoos', label: 'Facial Tattoos' },
  { value: 'a Hat', label: 'Hat' },
  { value: 'Piercings', label: 'Piercings' },
  { value: 'a Scarf', label: 'Scarf' },
];
const hairLengths = [
  { value: 'Short', label: 'Short' },
  { value: 'Shoulder-length', label: 'Medium' },
  { value: 'Long', label: 'Long' },
  { value: 'Bald', label: 'Bald' },
  { value: 'Curly', label: 'Curly' },
  { value: 'Shaved', label: 'Shaved' },
];
const hairColors = [
  { value: 'Black', label: 'Black' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Blonde', label: 'Blonde' },
  { value: 'Red', label: 'Red' },
  { value: 'White', label: 'White' },
  { value: 'Silver', label: 'Silver' },
  { value: ' ', label: 'None' },
];

const ethnicity = [
  { value: 'African', label: 'African' },
  { value: 'Southeast Asian', label: 'Southeast Asian' },
  { value: 'Asian', label: 'Asian' },
  { value: 'American', label: 'American' },
  { value: 'Scandinavian', label: 'Scandinavian' },
  { value: 'Caribbean', label: 'Caribbean' },
  { value: 'Polynesian', label: 'Polynesian' },
  { value: 'South American', label: 'South American' },
  { value: 'European', label: 'European' },
  { value: 'East-European', label: 'East-European' },
  { value: 'Middle Eastern', label: 'Middle Eastern' },
  { value: 'Oceanic', label: 'Oceanic' },
  { value: ' ', label: 'None' },
];

const customStyles = {
  control: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    borderRadius: '30px',
    borderColor: '#ccc',
    minHeight: '50px',
    width: '400px', // Fixed width for the control
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
  }),
  menu: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    width: '400px', // Fixed width for the menu to match the control
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#888',
    fontSize: '14px',
  }),
  multiValue: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    padding: '2px 6px',
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#333',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#888',
    '&:hover': {
      color: '#444',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#888',
    '&:hover': {
      color: '#444',
    },
  }),
};

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
      [field]: selectedOptions.map((option) => option.value),
    }));
  };

  const proceedToTheme = () => {
    const { gender, facialFeatures, hairLength, hairColor } = persona;

    if (
      gender.length === 0 ||
      facialFeatures.length === 0 ||
      hairLength.length === 0 ||
      hairColor.length === 0 ||
      ethnicity.length === 0
    ) {
      alert('Please select at least one option from each dropdown before proceeding.');
      return;
    }

    localStorage.setItem('persona', JSON.stringify(persona));
    router.push('/theme');
  };

  const dropdownContent = (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Gender:</label>
        <Select
          options={genders}
          isMulti
          onChange={(selected) => handleSelection('gender', selected || [])}
          placeholder="Choose"
          styles={customStyles}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Ethnicity:</label>
      <Select
        options={ethnicity}
        isMulti
        onChange={(selected) => handleSelection('ethnicity', selected || [])}
        placeholder="Choose"
        styles={customStyles}
      />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Accessoires:</label>
        <Select
          options={facialFeatures}
          isMulti
          onChange={(selected) => handleSelection('facialFeatures', selected || [])}
          placeholder="Choose"
          styles={customStyles}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Hair Length:</label>
        <Select
          options={hairLengths}
          isMulti
          onChange={(selected) => handleSelection('hairLength', selected || [])}
          placeholder="Choose"
          styles={customStyles}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '20px', color: '#333', marginBottom: '10px', display: 'block'}}>Hair Color:</label>
        <Select
          options={hairColors}
          isMulti
          onChange={(selected) => handleSelection('hairColor', selected || [])}
          placeholder="Choose"
          styles={customStyles}
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
