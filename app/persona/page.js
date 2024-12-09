// sepcify persona details with drop downs to get better output 

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const genders = ['Male', 'Female', 'Diverse'];
const facialFeatures = ['Long Beard', 'Short beard', 'Mustache', 'Piercings', 'Birthmark', 'Glasses', 'Freckles', 'Hat', 'No Specific Features'];
const hairLengths = ['Short', 'Shoulder-length', 'Long', 'Bald', 'Shaved'];
const hairColors = ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Dyed'];

export default function PersonaPage() {
  const router = useRouter();
  const [persona, setPersona] = useState({
    gender: '',
    facialFeature: '',
    hairLength: '',
    hairColor: '',
  });

  const handleSelection = (field, value) => {
    setPersona((prev) => ({ ...prev, [field]: value }));
  };

  const proceedToTheme = () => {
    const { gender, facialFeature, hairLength, hairColor } = persona;

    if (!gender || !facialFeature || !hairLength || !hairColor) {
      alert('Please select all options before proceeding.');
      return;
    }

    // Save persona to localStorage
    localStorage.setItem('persona', JSON.stringify(persona));
    router.push('/theme');
  };

  return (
    <div className="persona-page">
      <h1>Select Persona Details</h1>

      <div>
        <label>Gender:</label>
        <select onChange={(e) => handleSelection('gender', e.target.value)}>
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Facial Features:</label>
        <select onChange={(e) => handleSelection('facialFeature', e.target.value)}>
          <option value="">Select Facial Feature</option>
          {facialFeatures.map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hair Length:</label>
        <select onChange={(e) => handleSelection('hairLength', e.target.value)}>
          <option value="">Select Hair Length</option>
          {hairLengths.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hair Color:</label>
        <select onChange={(e) => handleSelection('hairColor', e.target.value)}>
          <option value="">Select Hair Color</option>
          {hairColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <button onClick={proceedToTheme}>Next</button>
    </div>
  );
}
