import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokenLocalStorage, setTokenLocalStorage } from 'src/utils';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { ACCESS_TOKEN_KEY } from 'src/configs/const';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (request: AxiosRequestConfig) => {
  const accessToken = getTokenLocalStorage(ACCESS_TOKEN_KEY);
  if (accessToken) {
    const user = jwt_decode(accessToken);
    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      request.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
      return request;
    }
  }

  const response = await axios.post(`${baseURL}/auth/refresh-token`);
  const { access_token } = response.data;
  setTokenLocalStorage(ACCESS_TOKEN_KEY, access_token);
  request.headers.Authorization = `Bearer ${access_token}`;
  return request;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
    // return new Promise((resolve, reject) => {
    //   resolve(response);
    // });
  },
  (error) => {
    if (error.message === 'Network Error' && !error.response) {
      // toast.error('Network error - make sure API is running!')
    }

    // The request was made and the server responded with a status code
    const { status, data, config } = error.response;

    if (status === 404) {
      // not found
      throw Error('The request is not valid');
    }

    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
      // wrong end-point:  request with endpoint is not defined on server
    }

    if (status === 500) {
      // toast.error('Server error -check the terminal for more info')
    }

    if (status === 401 && data.message === 'Invalid refresh token') {
      // refresh-token: expired
      localStorage.removeItem('access_token');
      window.location.href = '/auth/login';
      throw Error('Unauthorize please login');
    }

    if (error.response.status === 403) {
      // forbidden
      window.location.href = '/auth/login';
      throw Error('Unauthorize please login');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
