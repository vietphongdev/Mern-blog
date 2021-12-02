export type User = {
  _id: string;
  name: string;
  avatar: string;
  account: string;
  password: string;
  role: string;
};
export type UserSignup = Pick<User, 'name' | 'account' | 'password'>;
export type UserLogin = Pick<User, 'account' | 'password'>;

export type GoogleLogin = {
  tokenId: string;
};

export type AuthDispatch = AuthLoading | AuthFail | AuthSuccess;

export type AuthLoading = {
  type: string;
  payload?: any;
};

export type AuthFail = {
  type: string;
  payload: {
    error: string;
  };
};

export type AuthSuccess = {
  type: string;
  payload: {
    user: User;
  };
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  user: User;
};

export type SignupResponse = {
  message: string;
  user: {
    name: string;
    account: string;
  };
};

export type ActivePhone = {
  user: UserSignup;
  code: string;
  expiredTime: number;
};
