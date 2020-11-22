import Vue from 'vue';
import Vuex from 'vuex';
import ws from '@/api/websocket';
Vue.use(Vuex);

import { getToken } from '@/api/auth';
import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
  setIsLoginCookie,
  getIsLoginCookie,
  saveUniqIdToCookie,
  getUniqIdFromCookie,
} from '@/utils/cookies';
export default new Vuex.Store({
  state: {
    stompClient: null,
    userId: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    isLogin: getIsLoginCookie() || false,
    uniqId: getUniqIdFromCookie() || '',
    isNavOpen: false,
    isModalOpen: false,
    alertMessage: '',
    isSpinnerView: false,
  },
  mutations: {
    navOpen(state) {
      state.isNavOpen = true;
    },
    navClose(state) {
      state.isNavOpen = false;
    },
    modalOpen(state, message) {
      state.alertMessage = message;
      state.isModalOpen = true;
    },
    modalClose(state) {
      state.alertMessage = '';
      state.isModalOpen = false;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUniqId(state, uniqId) {
      state.uniqId = uniqId;
    },
    setStompClient(state, stompClient) {
      state.stompClient = stompClient;
    },
    loginInfoRefresh(state) {
      state.userId = getUserFromCookie() || '';
      state.token = getAuthFromCookie() || '';
      state.isLogin = getIsLoginCookie() || false;
      state.uniqId = getUniqIdFromCookie() || '';
      state.stompClient = null;
    },
    spinnerOn(state) {
      state.isSpinnerView = true;
    },
    spinnerOff(state) {
      state.isSpinnerView = false;
    },
  },
  actions: {
    async login({ commit }, userData) {
      const { data } = await getToken(userData);
      commit('setToken', data.token);
      commit('setUserId', data.userId);
      commit('setIsLogin', true);
      commit('setUniqId', data.uniqId);
      setIsLoginCookie(true);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.userId);
      saveUniqIdToCookie(data.uniqId);
      // const stomp = await ws.wsConnect();
      //commit('setStompClient', stomp);
    },
    // async wsConnect({ commit }) {
    //   const stomp = await ws.wsConnect();
    //   commit('setStompClient', stomp);
    // },
  },
  modules: {},
});
