import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokenLocalStorage, setTokenLocalStorage } from 'src/utils';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (request: AxiosRequestConfig) => {
  const accessToken = getTokenLocalStorage('access_token');
  if (accessToken) {
    request.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  const user = jwt_decode(accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return request;

  const response = await axios.post(`${baseURL}/auth/refresh-token`);

  const { access_token } = response.data;

  setTokenLocalStorage('access_token', access_token);

  request.headers.Authorization = `Bearer ${access_token}`;
  return request;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('successs - response >>>', response);
    return response.data;
    // return new Promise((resolve, reject) => {
    //   resolve(response);
    // });
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code

      const { status, data } = error.response;
      const originalRequest = error.config;

      // that falls out of the range of 2xx
      console.log('case-1 - data >>>>>>>>', data);
      console.log('case-1 - status >>>>>>>>', status);

      // wrong end-point:  request with endpoint is not defined on server
      if (status === 404) {
        throw Error('The request is not valid');
      }

      // refresh-token: expired
      if (status === 401 && data.message === 'Invalid refresh token') {
        localStorage.removeItem('access_token');
        window.location.href = '/auth/login';
        throw Error('Unauthorize please login');
      }

      // forbidden
      if (error.response.status === 403) {
        window.location.href = '/auth/login';
        throw Error('Unauthorize please login');
      }

      throw Error(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // Khong co ket noi mang
      // Server dang tat khong ket noi den duoc
      console.error('case-2 - error >>>>>>>>', error);
      console.log('case-2 - error.request >>>>>>>>', error.request);

      throw Error('Could not fetch the data for that resource');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('case-3 >>>>>>>>', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
