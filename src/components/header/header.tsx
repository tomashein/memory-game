import clsx from 'clsx';
import type { HeaderProps } from 'react-html-props';
import './header.css';

const Header: React.FC<HeaderProps> = ({ className, children, ...props }) => {
  return (
    <header className={clsx('header', className)} {...props}>
      {children}
      <h1>A Memory Game</h1>
      <p>Animals</p>
    </header>
  );
};

export default Header;
