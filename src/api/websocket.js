import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';
import store from '@/store/index';
const ws = {
  async wsConnect(header, withAuth) {
    if (store.state.stompClient != null) {
      store.state.stompClient.disconnect();
    }
    let url = process.env.VUE_APP_API_URL + 'endPoint';
    var socket = new SockJS(url);
    let stompClient = await Stomp.over(socket);
    if (withAuth) {
      header = { 'auth-token': store.state.token, ...header };
    }
    return new Promise(function(resolve, reject) {
      stompClient.connect(header, function(frame) {
        store.state.stompClient = stompClient;
        resolve();
      });
    });
  },
  subscribe(location, callback) {
    store.state.stompClient.subscribe(`/sub${location}`, function(result) {
      callback(result);
    });
  },
  sendMessage(location, param) {
    store.state.stompClient.send(
      '/msg' + location,
      { 'auth-token': store.state.token },
      JSON.stringify(param),
    );
  },
  disconnect() {
    if (store.state.stompClient != null) {
      store.state.stompClient.disconnect();
    }
  },
};

export default ws;
