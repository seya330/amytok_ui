import { instance, authInstance } from '@/api/httpUtil';
function getToken(userData) {
  return instance.post('login', userData);
}

export { getToken };
