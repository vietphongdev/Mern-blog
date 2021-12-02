import React from 'react';
import { CgSpinner } from 'react-icons/cg';

type ButtonProps = {
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  className: string;
};

export const Button = ({ label, isDisabled, isLoading, className }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center ${className}`}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <CgSpinner size={18} className="animate-spin mr-2" />}
      <span>{label}</span>
    </button>
  );
};
