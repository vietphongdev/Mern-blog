import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type InputProps = {
  type?: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
};
export const TextInput = ({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onInputChange,
  touched,
  error,
}: InputProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <label className="text-sm mb-2">{label}</label>
      <div className="relative w-full">
        {type === 'password' ? (
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <label
              className="bg-gray hover:bg-gray-400 rounded px-4 py-2 text-sm cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <BsEye /> : <BsEyeSlash />}
            </label>
          </div>
        ) : null}
        <input
          type={type === 'password' && show ? 'text' : type}
          name={name}
          placeholder={placeholder}
          className={`w-full h-10 p-2 border border-${
            touched && error ? 'red' : 'gray'
          }-light rounded-md focus:outline-none`}
          value={value}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};
