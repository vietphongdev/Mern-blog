import axiosClient from 'configs/axios-client';
import {
  UserSignup,
  UserLogin,
  LoginResponse,
  SignupResponse,
  ActivePhone,
  GoogleLogin,
} from 'src/types';

const baseEndPoint = '/auth';

export const signup = (body: UserSignup): Promise<SignupResponse> => {
  const endPoint = `${baseEndPoint}/signup`;
  return axiosClient.post(endPoint, body);
};

export const activePhone = (body: ActivePhone): Promise<SignupResponse> => {
  const endPoint = `${baseEndPoint}/phone-active`;
  return axiosClient.post(endPoint, body);
};

export const login = (body: UserLogin): Promise<LoginResponse> => {
  const endPoint = `${baseEndPoint}/account-login`;
  return axiosClient.post(endPoint, body);
};

export const googleLogin = (body: GoogleLogin): Promise<LoginResponse> => {
  const endPoint = `${baseEndPoint}/google-login`;
  return axiosClient.post(endPoint, body);
};
