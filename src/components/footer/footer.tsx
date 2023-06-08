import { memo } from 'react';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      developed by
      <a href="https://tomashein.dev" target="_blank">
        tomas hein
      </a>
    </footer>
  );
};

const MemoizedFooter = memo(Footer);

export default MemoizedFooter;
