import store from '@/store/index';
import { deleteCookie, setIsLoginCookie } from '@/utils/cookies';
import router from '@/router/index';
export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      config.headers.authToken = store.state.token;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.data == 'EXPIRE TOKEN') {
        deleteCookie('amyutok_auth');
        deleteCookie('amyutok_user');
        deleteCookie('amyutok_uniqId');
        deleteCookie('amyutok_isLogin');
        router.push('/');
        store.commit('loginInfoRefresh');
        store.commit('modalOpen', '로그인 시간이 만료 되었습니다.');
      }
      return Promise.reject(error);
    },
  );
  return instance;
}
