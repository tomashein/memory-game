import clsx from 'clsx';
import type { ButtonProps as HTMLButtonProps } from 'react-html-props';
import styles from './button.module.css';

type ButtonProps = HTMLButtonProps & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'dark' | 'light';
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = 'sm',
  variant = 'primary',
  type = 'button',
  ...props
}) => {
  const classes = clsx(styles.button, styles[`button_${size}`], styles[`button_${variant}`], className);

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
