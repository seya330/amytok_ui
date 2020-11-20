import axios from 'axios';
import { setInterceptors } from './axiosInterceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return instance;
}

function createAuthInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const authInstance = createAuthInstance();
