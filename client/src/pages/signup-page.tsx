import React from 'react';
import { useSelector } from 'react-redux';
import { SignUpForm, EmailConfirm, PhoneConfirm } from 'src/features/authenticate';
import { Store } from 'src/types';

export const SignupPage = () => {
  const { user } = useSelector((state: Store) => state.authState);
  return (
    <section className="w-2/3 max-w-md mx-auto mt-8">
      <div className="grid col-start-2 row-start-2 p-8 rounded-lg bg-gray-lightest border border-gray-dark bg-opacity-70 shadow-md">
        <h2 className="mb-3 text-center text-2xl font-bold">Create Account!</h2>
        {!user && <SignUpForm />}
        {user?.account.includes('@') && <EmailConfirm />}
        {user?.account && !user?.account.includes('@') && <PhoneConfirm />}
      </div>
    </section>
  );
};
