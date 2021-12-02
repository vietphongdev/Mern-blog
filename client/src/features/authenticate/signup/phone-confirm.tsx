import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Button, TextInput } from 'src/components/shared';
import { Store } from 'src/types';

export const PhoneConfirm = () => {
  const { isLoading, error, user } = useSelector((state: Store) => state.authState);
  return (
    <div>
      <h2 className="flex items-center text-green-light font-extrabold">
        <AiFillCheckCircle size={20} className="mr-2" />
        Register success fully
      </h2>
      <div className="p-5 mt-3 text-sm bg-green-lightest text-green-light rounded-md">
        <p>
          Welcome <span className="text-orange font-extrabold">{user?.name}</span>, your account has
          been successfully registered. We have sent you an code at
          <span className="mx-1 text-orange font-extrabold">{user?.account}</span>. Please check
          your phone.
        </p>
        <p className="mt-3">
          If you did not receive the activation code from us, please click
          <button className="ml-2 px-2 py-1 font-medium rounded bg-orange cursor-pointer text-white">
            <span className="flex items-center">
              resend <BiRefresh className="ml-1" />
            </span>
          </button>
        </p>
      </div>
      <div className="mt-3">
        <TextInput label="Code" name="code" placeholder="Enter your code" />
        <Button
          label="Send"
          className="w-full mt-3 p-2 bg-orange-dark rounded-md shadow-md color text-white disabled:opacity-50"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
