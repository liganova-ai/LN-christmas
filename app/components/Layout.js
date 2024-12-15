"use client";

import React from 'react';
import PropTypes from 'prop-types';
import Logo from './logo';
import styles from './Layout.module.css';

const Layout = ({ 
  heading, 
  headingColor = "#c1363c", // Default heading color 
  copyText, 
  copyTextColor = "#f3df6e", // Default copy text color
  middleContent, 
  children, 
  bgColor 
}) => {
  return (
    <div
      className={styles.layout}
    >
        <h1 
          className={styles.heading} 
          style={{ color: headingColor }} // Dynamic heading color
        >
          {heading}
        </h1>
        <p 
          className={styles.copyText} 
          style={{ color: copyTextColor }} // Dynamic copy text color
        >
          {copyText}
        </p>
      <main className={styles.middleContent}>{middleContent}</main>

      <footer className={styles.footer}>{children}</footer>
    </div>
  );
};

Layout.propTypes = {
  heading: PropTypes.string.isRequired,
  headingColor: PropTypes.string,
  copyText: PropTypes.string.isRequired,
  copyTextColor: PropTypes.string,
  middleContent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
};

export default Layout;
