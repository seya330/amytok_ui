import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import ws from '@/api/websocket';
Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main.vue'),
    },
    {
      path: '/chatlist',
      component: () => import('@/views/ChatList.vue'),
      meta: { auth: true },
    },
    {
      path: '/chatRoom/:chatRoomId',
      component: () => import('@/views/ChatRoom.vue'),
      meta: { auth: true },
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/randomChat',
      component: () => import('@/views/RandomChat.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/PageNotFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('navClose');
  if (from.path == '/randomChat') {
    ws.disconnect();
  }
  if (to.meta.auth && !store.state.isLogin) {
    next('/');
    return;
  }
  next();
});

export default router;
