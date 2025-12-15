import { cn } from '@/lib/utils';
import React from 'react';

type ErrorParagraphProps = {
  text: string;
  className?: string;
};

const ErrorParagraph = ({ text, className }: ErrorParagraphProps) => {
  return (
    <p className={cn('text-red-500 text-sm font-semibold', className)}>
      {text}
    </p>
  );
};

export default ErrorParagraph;
