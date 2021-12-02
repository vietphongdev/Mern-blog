import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  ACTIVE_LOADING,
  ACTIVE_SUCCESS,
  ACTIVE_FAIL,
} from 'src/redux/consts';
import { Dispatch } from 'redux';
import { AuthApi } from 'src/services';
import { ActivePhone, AuthDispatch, GoogleLogin, UserLogin, UserSignup } from 'src/types';

export const signup = (body: UserSignup) => async (dispatch: Dispatch<AuthDispatch>) => {
  try {
    dispatch({
      type: SIGNUP_LOADING,
    });
    const response = await AuthApi.signup(body);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        user: response.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: {
        error: error.message,
      },
    });
  }
};

export const activePhone = (body: ActivePhone) => async (dispatch: Dispatch<AuthDispatch>) => {
  try {
    dispatch({
      type: ACTIVE_LOADING,
    });
    const response = await AuthApi.activePhone(body);
    dispatch({
      type: ACTIVE_SUCCESS,
      payload: {
        user: response.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: ACTIVE_FAIL,
      payload: {
        error: error.message,
      },
    });
  }
};

export const login = (body: UserLogin) => async (dispatch: Dispatch<AuthDispatch>) => {
  try {
    dispatch({
      type: LOGIN_LOADING,
    });
    const response = await AuthApi.login(body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error: error.message,
      },
    });
  }
};

export const googleLogin = (body: GoogleLogin) => async (dispatch: Dispatch<AuthDispatch>) => {
  try {
    dispatch({
      type: LOGIN_LOADING,
    });
    const response = await AuthApi.googleLogin(body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error: error.message,
      },
    });
  }
};
