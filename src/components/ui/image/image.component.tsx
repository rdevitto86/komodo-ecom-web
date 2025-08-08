import React from 'react';
import styles from './image.component.module.css';

type ImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'eager' | 'lazy';
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  width,
  height,
  className,
  style,
  loading = 'lazy',
  onClick,
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`${styles.image} ${className ?? ''}`}
    style={style}
    loading={loading}
    onClick={onClick}
    role={alt === '' ? 'presentation' : undefined}
    tabIndex={onClick ? 0 : -1}
  />
);

export default Image;
