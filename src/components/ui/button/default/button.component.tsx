import React from 'react';
import styles from './base.component.module.css';

type BaseButtonProps = {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'submit' | 'close' | 'done';
  href?: string; // If provided, renders as a link
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string; // Custom class for additional styling
  style?: React.CSSProperties; // Inline styles
  disabled?: boolean;
  icon?: React.ReactNode; // Icon to render inside the button
  children?: React.ReactNode; // Nested content (e.g., additional elements)
};

const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  size = 'medium',
  variant = 'primary',
  href,
  onClick,
  className,
  style,
  disabled = false,
  icon,
  children,
}) => {
  const buttonClasses = `${styles.baseButton} ${styles[size]} ${styles[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        style={style}
        onClick={onClick}
        role="button"
        aria-disabled={disabled}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {text && <span className={styles.text}>{text}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </button>
  );
};

export default BaseButton;
