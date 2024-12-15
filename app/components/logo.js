"use client";

import React from 'react';
import styles from './logo.module.css';
import PropTypes from 'prop-types';

const Logo = ({ color }) => {
  return (
    <div className={styles.logo} style={{ color }}>
      LIGANOVA
    </div>
  );
};

// Prop types to validate color
Logo.propTypes = {
  color: PropTypes.oneOf(['yellow', 'red', 'pink']).isRequired,
};

export default Logo;
