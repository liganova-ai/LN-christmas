// components/Button.js
import styles from './Button.module.css';

export default function Button({ children, onClick, disabled }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
