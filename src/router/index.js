import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/chatlist',
      component: () => import('@/views/ChatList.vue'),
    },
    {
      path: '/chatRoom/:chatRoomId',
      component: () => import('@/views/ChatRoom.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/PageNotFound.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/Main.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('navClose');
  next();
});

export default router;
