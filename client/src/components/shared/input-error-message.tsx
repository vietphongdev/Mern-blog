import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

type ErrorMessageProps = {
  message?: string;
};
export const InputErrorMsg = ({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <div className="mt-2 flex items-center text-sm text-red">
      <BiErrorCircle size={17} className="mr-1" />
      {message}
    </div>
  );
};
