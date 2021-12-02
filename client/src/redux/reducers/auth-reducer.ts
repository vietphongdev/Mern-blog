import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
} from 'src/redux/consts';
import { AuthDispatch, User } from 'src/types';

type InitialState = {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: InitialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (
  state: InitialState = initialState,
  action: AuthDispatch
): InitialState => {
  switch (action.type) {
    case LOGIN_LOADING:
    case SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
