import { ButtonProps as HTMLButtonProps } from 'react-html-props';
import clsx from 'clsx';
import './button.css';

type ButtonProps = HTMLButtonProps & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'dark' | 'light';
};

const Button = ({ children, className, size = 'md', type = 'button', variant = 'primary', ...props }: ButtonProps) => {
  const classes = clsx('button', `button_${size}`, `button_${variant}`, className);

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
