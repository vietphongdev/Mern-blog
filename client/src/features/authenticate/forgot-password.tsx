import React from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordForm = () => {
  const handleChange = (event: any) => {};

  const handleSubmit = () => {};

  return (
    <section id="entry-page">
      <form className="grid col-start-2 row-start-2 p-8 rounded-lg bg-gray-lightest border border-gray-dark bg-opacity-70 shadow-md">
        <h6 className="max-w-sm text-center text-sm my-3">
          Please enter your email address and we will send you a link to your email address to reset
          your password.
        </h6>
        <fieldset className="bg-white shadow-md rounded-md border border-gray-dark pb-4">
          <legend className="font-bold p-3 bg-white rounded border-t border-gray-dark">
            Forgot Password
          </legend>
          <ul>
            <li className="grid m-4 items-center">
              <label className="text-sm mb-2">Email/Phone:</label>
              <input
                type="email"
                required
                className="p-2 border border-gray rounded-md focus:outline-none"
              />
            </li>
          </ul>
        </fieldset>
        <button
          className="mt-3 p-2 bg-orange-dark rounded-md shadow-md color text-white disabled:opacity-50 cursor-default"
          disabled
        >
          Submit
        </button>
        <div className="flex justify-end mt-2">
          <Link className="text-sm hover:underline" to="/login">
            Back to login!
          </Link>
        </div>
      </form>
    </section>
  );
};
