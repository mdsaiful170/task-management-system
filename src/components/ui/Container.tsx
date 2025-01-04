import { cn } from '@utilits/utils';
import React, { ReactNode } from 'react';

interface ContainerProps {
  className?: string; // Optional className for custom styles
  children: ReactNode; // Content to be wrapped inside Container
}

export const Container: React.FC<ContainerProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={cn('max-w-screen-xl mx-auto px-3', className)}>
      {children}
    </div>
  );
};
