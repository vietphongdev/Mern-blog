import { emailRegex, phoneRegex } from 'src/utils';
import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string().required('Enter your name'),
  account: Yup.string()
    .required('Enter your email or phone number')
    .test('test-name', 'Email or Phone not valid', (value) => {
      let isValidEmail = emailRegex.test(`${value}`);
      let isValidPhone = phoneRegex.test(`${value}`);

      return isValidEmail || isValidPhone;
    }),
  password: Yup.string()
    .required('Enter your password')
    .min(6, 'Password must be at least 6 characters')
    .max(14, 'Maximum 14 characters only'),
});
