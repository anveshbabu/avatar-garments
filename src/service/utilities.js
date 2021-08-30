
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { EXIST_LOCAL_STORAGE } from './constants'
import { isJwtExpired } from 'jwt-check-expiration';
export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  headers: {

  }
});


export const logout = () => {
  axiosInstance.defaults.headers.common['Authorization'] = '';
  localStorage.clear();
  // history.push('/');
  window.location.reload(true);
};

export const isAuthenticated = (req, res, next) => {
  let accessToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  if (!!accessToken) {
    const jwtDecoded = jwtDecode(accessToken);
    if (new Date() < new Date(jwtDecoded.exp * 1e3)) {
      return true;
    } else {
      localStorage.removeItem(EXIST_LOCAL_STORAGE);
      return false
    }

  } else {
    console.error('session expired')
  }

}

export const jwtDecodeDetails = (req, res, next) => {
  let accessToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  if (!!accessToken) {
    return jwtDecode(accessToken);

  } else {
    console.error('Jwd null')
  }

}