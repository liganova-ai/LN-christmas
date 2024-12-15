"use client";

import React from 'react';
import styles from './logo.module.css';
import PropTypes from 'prop-types';

const colorMap = {
  yellow: '#F3DF6E',
  red: '#C32F33',
  pink: '#DE75A5',
};

const Logo = ({ color }) => {
  const hexColor = colorMap[color] || '#000'; // Fallback to black if color is invalid

  return (
    <div className={styles.logo} style={{ color: hexColor }}>
      LIGANOVA
    </div>
  );
};

// Prop types to validate color
Logo.propTypes = {
  color: PropTypes.oneOf(['yellow', 'red', 'pink']).isRequired,
};

export default Logo;
