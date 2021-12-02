import React from 'react';
import {
  GoogleLogin as ReactGooleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { googleLogin } from 'src/redux/actions';

export const GoogleLogin = () => {
  const dispatch = useDispatch();
  const responseSuccessGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      const tokenId = response?.tokenId;
      dispatch(googleLogin({ tokenId }));
    }
  };
  const responseFailureGoogle = () => {};
  return (
    <ReactGooleLogin
      clientId="708026484583-ghoqtnndsah96io2quvrlohl68umtc96.apps.googleusercontent.com"
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="w-2/3 flex items-center justify-center border border-gray px-4 py-2 rounded"
        >
          <AiFillGoogleCircle size={21} color="#e94820" />
          <span className="ml-2 text-sm">Google</span>
        </button>
      )}
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailureGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};
