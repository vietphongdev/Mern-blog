import React from 'react';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AiFillFacebook } from 'react-icons/ai';

export const FacebookLogin = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  return (
    <ReactFacebookLogin
      appId="1088597931155576"
      autoLoad
      callback={responseFacebook}
      render={(renderProps: any) => (
        <button
          className="w-2/3 flex items-center justify-center border border-gray px-4 py-2 rounded"
          onClick={renderProps.onClick}
        >
          <AiFillFacebook color="#456698" />

          <span className="ml-2 text-sm">Facebook</span>
        </button>
      )}
    />
  );
};
