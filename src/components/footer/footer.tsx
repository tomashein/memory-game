import clsx from 'clsx';
import type { FooterProps } from 'react-html-props';
import './footer.css';

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={clsx('footer', className)}>
      developed by
      <a className="footer__link" href="https://tomashein.dev" target="_blank">
        tomas hein
      </a>
    </footer>
  );
};

export default Footer;
