import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormErrorMsg, InputErrorMsg, OAuthLogin, TextInput } from 'src/components/shared';
import { signupSchema } from './signup-schema';
import { signup } from 'src/redux/actions';
import { Store } from 'src/types';

const initialValues = {
  name: '',
  account: '',
  password: '',
};

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: Store) => state.authState);
  const handleSignup = () => {
    dispatch(signup(values));
  };

  const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: handleSignup,
  });

  console.log('values >>>', values);
  console.log('errors >>>', errors);
  console.log('touched >>>', touched);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="bg-white shadow-md rounded-md border border-gray-dark pb-4">
        <legend className="font-bold p-3 bg-white rounded border-t border-gray-dark">
          Sign Up
        </legend>
        <FormErrorMsg error={error} />
        <div className="grid mx-4 mt-2">
          <TextInput
            label="Username"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onInputChange={(e) => setFieldValue('name', e.target.value)}
            touched={touched.name}
            error={errors.name}
          />
          {touched.name && <InputErrorMsg message={errors.name} />}
        </div>

        <div className="grid mx-4 mt-2">
          <TextInput
            label="Email/Phone"
            name="account"
            placeholder="Email address or phone"
            value={values.account}
            onInputChange={(e) => setFieldValue('account', e.target.value)}
            touched={touched.account}
            error={errors.account}
          />
          {touched.account && <InputErrorMsg message={errors.account} />}
        </div>

        <div className="grid mx-4 mt-2">
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onInputChange={(e) => setFieldValue('password', e.target.value)}
            touched={touched.password}
            error={errors.password}
          />
          {touched.password && <InputErrorMsg message={errors.password} />}
        </div>
      </fieldset>
      <Button
        label="Sign Up"
        className="w-full mt-3 p-2 bg-orange-dark rounded-md shadow-md color text-white disabled:opacity-50"
        isLoading={isLoading}
      />
      <div className="flex justify-end mt-2">
        <Link className="text-sm hover:underline" to="/login">
          Back to login!
        </Link>
      </div>
      <OAuthLogin />
    </form>
  );
};
