import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';
import store from '@/store/index';
const ws = {
  async wsConnect() {
    if (store.state.stompClient != null) {
      store.state.stompClient.disconnect();
    }
    let url = process.env.VUE_APP_API_URL + 'endPoint';
    var socket = new SockJS(url);
    let stompClient = await Stomp.over(socket);
    return new Promise(function(resolve, reject) {
      stompClient.connect(
        { chatType: 'GROUPCHAT', 'auth-token': store.state.token },
        function(frame) {
          store.state.stompClient = stompClient;
          console.log('resolve!!');
          resolve();
        },
      );
    });
  },
  subscribe(location, callback) {
    console.log(2);
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
};

export default ws;
