'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './persona.module.css';
import Select from 'react-select';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Logo from '../components/logo';

export default function PersonaPage() {
  const router = useRouter();
  const [persona, setPersona] = useState({
    gender: [],
    ethnicity: [],
  });

  const handleSelection = (field, selectedOption) => {
    setPersona((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : '', // Store the 'value' of the selected option
    }));
  };

  const proceedToTheme = () => {
    const { gender, ethnicity } = persona;
    console.log('PERSONA PAYLOADDDDDDD:' + JSON.stringify(persona) )

    if (gender.length === 0 || ethnicity.length === 0) {
      alert('Please select at least one option from each dropdown before proceeding.');
      return;
    }

    localStorage.setItem('persona', JSON.stringify(persona));
    router.push('/theme');
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const ethnicityOptions = [
    { value: 'African', label: 'African' },
    { value: 'American', label: 'American' },
    { value: 'Asian', label: 'Asian' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'East-European', label: 'East-European' },
    { value: 'European', label: 'European' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Middle East', label: 'Middle East' },
    { value: 'Oceanic', label: 'Oceanic' },
    { value: 'Polynesian', label: 'Polynesian' },
    { value: 'Scandinavian', label: 'Scandinavian' },
    { value: 'South American', label: 'South American' },
    { value: 'Southeast Asian', label: 'Southeast Asian' },
  ];

  return (
    <div className={styles.personaPage}>
      <header className={styles.header}>
        <Logo color="red" />
      </header>
      <Layout
        heading="GENERE"
        headingColor="#F3DF6E"
        copyText="Please help the AI to create a better output by providing information about your ethnicity and gender. Due to short time, we can only provide 2 gender options and apologize for the inconvenience.  This information will not be saved. "
        copyTextColor="#F3DF6E"
        middleContent={
          <div className={styles.container}>
            <div className={styles.dropdownWrapper}>
              <label className={styles.label}>Gender</label>
              <Select
                options={genderOptions}
                classNamePrefix="react-select"
                onChange={(selected) => handleSelection('gender', selected)}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '15px',
                    overflow: 'hidden',
                  }),
                  menuList: (base) => ({
                    ...base,
                    borderRadius: '15px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: '0.8rem', // Adjust font size here
                    color: '#888', // Optional: Change placeholder text color
                  }),
                }}
              />
            </div>
            <div className={styles.dropdownWrapper}>
              <label className={styles.label}>Ethnicity</label>
              <Select
                options={ethnicityOptions}
                classNamePrefix="react-select"
                onChange={(selected) => handleSelection('ethnicity', selected)}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '15px',
                    overflow: 'hidden',
                  }),
                  menuList: (base) => ({
                    ...base,
                    borderRadius: '15px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: '0.8rem', // Adjust font size here
                    color: '#888', // Optional: Change placeholder text color
                  }),
                }}
              />
            </div>
          </div>
        }
      >
        <Button onClick={proceedToTheme}>Continue</Button>
      </Layout>
    </div>
  );
}
