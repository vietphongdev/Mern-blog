import React from 'react';
import { LoginForm } from 'src/features/authenticate';

export const LoginPage = () => {
  return (
    <section className="w-2/3 max-w-md mx-auto mt-8">
      <div className="grid col-start-2 row-start-2 p-8 rounded-lg bg-gray-lightest border border-gray-dark bg-opacity-70 shadow-md">
        <h2 className="mb-3 text-center text-2xl font-bold">Welcome Back!</h2>
        <LoginForm />
      </div>
    </section>
  );
};
