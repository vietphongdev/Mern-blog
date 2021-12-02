import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormErrorMsg, InputErrorMsg, TextInput } from 'src/components/shared';
import { login } from 'src/redux/actions';
import { Store } from 'src/types';
import { loginSchema } from './login-schema';
import { OAuthLogin } from './oauth';

const initialValues = {
  account: '',
  password: '',
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: Store) => state.authState);
  const handleLogin = () => {
    dispatch(login(values));
  };

  const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="bg-white shadow-md rounded-md pb-4 border border-gray-dark">
        <legend className="font-bold p-3 bg-white rounded border-t border-gray-dark">Log In</legend>
        <FormErrorMsg error={error} />
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
        label="Login"
        className="w-full mt-3 p-2 bg-orange-dark rounded-md shadow-md color text-white disabled:opacity-50"
        isLoading={isLoading}
      />

      <div className="flex justify-between mt-4">
        <li className="text-sm hover:underline">
          <Link to="/signup">Create an Account</Link>
        </li>
        <li className="text-sm hover:underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </li>
      </div>
      <OAuthLogin />
    </form>
  );
};
