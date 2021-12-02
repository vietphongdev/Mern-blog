import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from 'src/redux/actions';
import { Store } from 'src/types';

export const EmailConfirm = () => {
  const { isLoading, error, user } = useSelector((state: Store) => state.authState);
  const dispatch = useDispatch();
  const handleResendEmail = () => {
    if (user && user.password) {
      dispatch(
        signup({
          name: user.name,
          account: user.account,
          password: user.password,
        })
      );
    }
  };

  return (
    <div>
      <h2 className="flex items-center text-green-light font-extrabold">
        <AiFillCheckCircle size={20} className="mr-2" />
        Register success fully
      </h2>
      <div className="p-5 mt-3 text-sm bg-green-lightest text-green-light rounded-md">
        <p>
          Welcome <span className="text-orange font-extrabold">{user?.name}</span>, your account has
          been successfully registered. We have sent you an activation email at
          <span className="mx-2 text-orange font-extrabold">{user?.account}</span>. Please check
          your inbox for completion.
        </p>
        <p className="mt-3">
          If you did not receive the activation email from us, please click
          <span
            className="mx-1 font-extrabold text-orange underline cursor-pointer"
            onClick={handleResendEmail}
          >
            resend
          </span>
          the activation email
        </p>
      </div>
    </div>
  );
};
