import React from "react";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";

export const OAuthLogin = () => {
  return (
    <>
      <div className="flex items-center my-3">
        <hr className="w-1/3" />
        <span className="w-1/3 text-center">Or login with</span>
        <hr className="w-1/3" />
      </div>

      <div className="flex justify-around">
        <button className="w-2/3 flex items-center justify-center">
          <AiFillFacebook color="#456698" />

          <span className="ml-2 text-sm">Facebook</span>
        </button>
        <button className="w-2/3 flex items-center justify-center ">
          <AiFillGoogleCircle color="#dd1414" />
          <span className="ml-2 text-sm">Google</span>
        </button>
        <button className="w-2/3 flex items-center justify-center ">
          <AiFillTwitterCircle color="#14a4dd" />
          <span className="ml-2 text-sm">Twiter</span>
        </button>
      </div>
    </>
  );
};
