'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from './theme.module.css';
import Logo from '../components/logo';

const themes = [
  { key: "italian_city_flair", svg: "/ItalianCityFlair.svg" },
  { key: "pool_party", svg: "/PoolParty.svg" },
  { key: "dance_moves", svg: "/DanceMoves.svg" },
  { key: "vip_lounge", svg: "/VipLounge.svg" },
];

export default function ThemePage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [persona, setPersona] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    const storedPersona = localStorage.getItem('persona');

    if (storedImage) setImage(storedImage);
    if (storedPersona) {
      const parsedPersona = JSON.parse(storedPersona);

      // Ensure gender is always lowercase
      if (parsedPersona.gender) {
        parsedPersona.gender = parsedPersona.gender.toLowerCase();
      }
      console.log(parsedPersona)
      setPersona(parsedPersona);
    }
  }, []);

  const handleThemeClick = (themeKey) => {
    setSelectedTheme((prev) => (prev === themeKey ? null : themeKey)); // Toggle selection
  };

  const handleContinue = async () => {
    if (isBlocked) return; // Back if clicked already

    if (!selectedTheme) {
      alert('Please select a theme before proceeding.');
      setIsBlocked(false);
      return;
    }
  
    if (!image) {
      alert('Image not found! Please upload or capture an image first.');
      setIsBlocked(false);
      return;
    }
  
    if (!persona) {
      alert('Gender and Ethnicity details not found. Please restart.');
      setIsBlocked(false);
      return;
    }

    setIsBlocked(true); // Blocking clicks
  
    const { gender, ethnicity } = persona;
    
  
    // Normalize ethnicity as an array
    const ethnicityArray = Array.isArray(ethnicity) ? ethnicity : [ethnicity];
  

  
    // Normalize theme key: Convert to lowercase and replace spaces with underscores
    const normalizedTheme = selectedTheme.toLowerCase().replace(/ /g, "_");
  
    const selectedPromptKey = `${normalizedTheme}_${gender.toLowerCase()}`;
    console.log("selected prompt key lower:", selectedPromptKey);
  
    const selectedPrompt = themePrompts[selectedPromptKey];
    console.log("Selected Prompt:", selectedPrompt);
  
    if (!selectedPrompt) {
      alert(`Prompt not found for theme: ${selectedPrompt}`);
      setIsBlocked(false);
      return;
    }
  
    const combinedPrompt = selectedPrompt.replace("[ethnicity]", ethnicityArray.join(" "));
    console.log("Combined Prompt:", combinedPrompt);

    try {
      setIsLoading(true);
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: combinedPrompt, main_face_image: image }),
      });

      const prediction = await response.json();
      setIsLoading(false);

      if (response.status !== 201) {
        alert(`Error: ${prediction.detail}`);
        setIsBlocked(false);
        return;
      }

      localStorage.setItem('predictionId', prediction.id);
      router.push('/loading');
    } catch (error) {
      console.error('Error during theme selection:', error);
      alert('An error occurred. Please try again.');
      setIsBlocked(false);
      setIsLoading(false);
    }
  };

  const themePrompts = {
    "italian_city_flair_female": "Polaroid of a [ethnicity] women in a 1980 outfit, with long high waist pants, tailored blouse, a wide-brimmed hat and dark black cat-eye sunglasses, including golden necklace and earrings, red lipstick and blush make up, walking down an Italian street, confident and sassy model walk, holding her designer handbag in the left hand, for a hot day, Gianni Versace, Dolce e Gabanna, 80s italian Fiat driving in italian neigbbourhood, dolce vita lifestyle with people sitting at cafes Italian neighbourhood enjoying life, Kodak 5247 film stock, movie-still photography, flashlight photography, sun shining, thin polaroid frame, bloom, faded colours, old picture, Saturday night fever",
    "italian_city_flair_male": "Polaroid of a [ethnicity] man dressed in a 1980 double-breasted tailored suit with a soft colour palette, open shirt with chest hair revealing, wearing aviator sunglasses a mafioso beard and a fedora hat walking down an Italian street, large golden watch, mafiosi chiccolo style, daylight with a beige colour scheme, 1980 cars driving by, dolce vita lifestyle with people sitting at cafes Italian neighbourhood enjoying life, Kodak 5247 film stock, movie-still photography, flashlight photography, sun shining, thin polaroid frame, bloom, faded colours, old picture, Saturday night fever",
    "pool_party_female": "Polaroid of a [ethnicity] European woman dressed in a 1980s bold orange full-body swimsuit by Gianni Versace and Dolce e Gabanna, black sharp-edged cat-eye sunglasses and deep red lipstick, white towel wrapped around the head, lying on a sunbed with sunshade next to a pool, a glass of Aperol Spritz in a wine glass and an ashtray on a side table, in the background an 80s Playboy pool party with people, Luxurious Italian neighbourhood with 80s architecture, people swimming in the water and jumping into the pool, enjoy dolce vita life, Kodak 5247 film stock, flashlight photography, sun shining, thin polaroid frame, bloom, faded colours, old picture, Saturday night fever, desperate housewives, Baywatch", 
    "pool_party_male": "Polaroid of a [ethnicity] man dressed in a 1980 bold pattern coloured shirt by Gianni Versace, an open shirt with chest hair revealing, a heavy golden necklace and a large golden watch, wearing transparent aviator glasses with a thick beard, a fedora hat, sitting on a white table full with seafood Michelin star and champagne, in the background an 80s Playboy pool party in the Italian neighbourhood with 80s architecture, people enjoy dolce vita life, Kodak 5247 film stock, flashlight photography, sun shining, thin polaroid frame, bloom, faded colours, old picture, Saturday night fever",
    "dance_moves_female": "Polaroid of a [ethnicity] woman in a club environment fully dressed in 80s fashion, Bold 80s jumpsuit in light blue colour with broad shoulder, high waisted wide belt, red lipstick and blush on checks, sharp edgy cat-eye sunglasses, performing dance moves, spotlight shining on the person in the centre, white spotlight and smoke in the fully silver background made of hundreds of disco balls and silver sequins reflecting light, mystic club moment, 1980s Gianni Versace collection, inspired by Dolce e Gabbana, 1980s disco party, 80s colours, Saturday Night Fever, Flashlight Celebrity Photography, white polaroid frame, faded colours",
    "dance_moves_male": "Polaroid of a [ethnicity] man in an 80s club environment fully dressed in 80s fashion, Bold 80s pattern silk shirt in vibrant colours unbuttoned with thick black chest hair and white high-waisted tight pants with a golden watch and aviator sunglasses 80s haircut mullet, performing dance moves, spotlight shining on the person in the centre, white spotlight and smoke in the fully silver background made of hundreds of disco balls and silver sequins reflecting light, mystic club moment, 1980s Gianni Versace collection, inspired by Dolce e Gabbana, 1980s disco party, 80s colours, Saturday Night Fever, Flashlight Photography, white polaroid frame, faded colours",
    "vip_lounge_female": "Polaroid of a [ethnicity] woman in a club environment sitting on a black couch with silver panels in the back, 80s Italian bar-restaurant, high society club, a woman dressed in 80s bold sequin luxurious jumpsuit in Dolce e Gabanna In silver wearing sharp edged cat eye sunglasses, enjoying her champagne, handbag on the table next to pieces of pizza and champagne, silver club environment, silver background, 1980s Gianni Versace collection, inspired by Dolce e Gabbana, 1980s disco party, 80s colours, Saturday Night Fever, Flashlight celebrity Photography, big white polaroid frame, faded colours, disco balls and sequins in reflection, kim kardashian",
    "vip_lounge_male": "Polaroid of a [ethnicity] man inside a VIP club environment leaning forward with one leg apart on a black couch with silver panels in the back, 80s Italian bar-restaurant, high society club, a man dressed in an 1980s double-breasted light grey wide shoulder blazer and a white shirt revealing chest hair, 80s glasses a fedora hat with a strong moustache smoking a cigar, Mafioso style golden jewellery and fat watch, ashtray on the table next to pieces of pizza and champagne, silver club environment, monotone silver background, 1980s Gianni Versace collection, inspired by Dolce e Gabbana, 1980s disco party, 80s colours, Saturday Night Fever, Flashlight celebrity Photography, big white polaroid frame, faded colours, disco balls and sequins in reflection, nighttime photography"
  };

  return (
    <div className={styles.themePage}>
      <header className={styles.header}>
        <Logo color="yellow"/> 
      </header>
      <Layout heading="THEME" 
      headingColor='#DE75A5'
      copyText={''}
      middleContent={<div className={styles.themeContainer}>
      <div className={styles.themeRow}>
        <h2 className={styles.themeHeading}>CIAO NATALE</h2>
        <p className={styles.themeCopy}>80s vacation in Italy</p>
        <div className={styles.svgContainer}>
          {themes.slice(0, 2).map((theme) => (
            <div
              key={theme.key}
              className={`${styles.themeWrapper} ${
                selectedTheme === theme.key ? styles.selected : ''
              }`}
              onClick={() => handleThemeClick(theme.key)}
            >
              <img
                src={theme.svg}
                alt={theme.key}
                className={styles.themeSvg}
              />
              {selectedTheme === theme.key && (
                <img
                  src="/select_circle.svg"
                  alt="Selected Overlay"
                  className={styles.selectOverlay}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.themeRow}>
        <h2 className={styles.themeHeading}>ITALO DISCO</h2>
        <p className={styles.themeCopy}>Party like its the 80s</p>
        <div className={styles.svgContainer}>
          {themes.slice(2).map((theme) => (
            <div
              key={theme.key}
              className={`${styles.themeWrapper} ${
                selectedTheme === theme.key ? styles.selected : ''
              }`}
              onClick={() => handleThemeClick(theme.key)}
            >
              <img
                src={theme.svg}
                alt={theme.key}
                className={styles.themeSvg}
              />
              {selectedTheme === theme.key && (
                <img
                  src="/select_circle.svg"
                  alt="Selected Overlay"
                  className={styles.selectOverlay}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>}>
        
        <Button onClick={handleContinue}>Continue</Button>
      </Layout>
    </div>
  );
}
