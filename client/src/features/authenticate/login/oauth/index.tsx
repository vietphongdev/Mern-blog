import React from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FacebookLogin } from './facebook-login';
import { GoogleLogin } from './google-login';

export const OAuthLogin = () => {
  return (
    <>
      <div className="flex items-center my-4">
        <hr className="w-1/3" />
        <span className="w-1/3 text-center">Or login with</span>
        <hr className="w-1/3" />
      </div>

      <div className="flex justify-around space-x-3">
        <FacebookLogin />
        <GoogleLogin />
        <button className="w-2/3 flex items-center justify-center border border-gray px-4 py-2 rounded">
          <AiFillTwitterCircle color="#14a4dd" />
          <span className="ml-2 text-sm">Twiter</span>
        </button>
      </div>
    </>
  );
};
