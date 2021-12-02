import React from 'react';

type ErrorMessageProps = {
  error: string | null;
};
export const FormErrorMsg = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return (
    <div className="my-2 mx-4 p-2 flex items-center text-sm text-red-light bg-red-lightest rounded">
      {error}
    </div>
  );
};
