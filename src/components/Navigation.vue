<template>
  <div id="nav" class="nav" ref="nav" :class="isNavOpen ? 'nav-open' : null">
    <div class="nav-header">
      <img src="@/assets/amyutok_logo.png" style="width: 40px;" />
      <span class="closebtn" @click="closeNav">
        <i class="icon ion-md-close"></i>
      </span>
    </div>
    <div class="info">
      <div v-if="$store.state.isLogin">
        <i class="icon ion-md-contact"></i>
        <span class="username">{{ $store.state.userId }}</span>
        <span style="float: right;">
          <i
            class="icon ion-ios-log-out"
            style="font-size: 30px;"
            @click="$store.commit('logout')"
          ></i>
        </span>
      </div>
      <div v-else>
        <span style="display: inline-block;" @click="goSignUp">
          <i class="icon ion-md-person-add" style="font-size: 35px;"></i>
          <p
            style="position: absolute; display: inline; left: 0px; top: 56px; font-size: 5px; margin-left: 11px;"
          >
            회원가입
          </p>
        </span>
        <router-link to="/login" class="username-link">
          로그인해 주세요.
        </router-link>
      </div>
    </div>
    <div class="link-wrapper">
      <router-link to="/">
        <div><i class="icon ion-ios-home"></i>HOME</div>
      </router-link>
      <router-link to="/login" v-if="!$store.state.isLogin">
        <div><i class="icon ion-md-log-in"></i>Login</div>
      </router-link>
      <router-link to="/randomChat">
        <div><i class="icon ion-ios-chatboxes"></i>Random Chatting</div>
      </router-link>
      <router-link to="/chatlist">
        <div><i class="icon ion-ios-chatboxes"></i>Messenger</div>
      </router-link>
      <router-link to="/">
        <div style=""><i class="icon ion-ios-at"></i>about</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    closeNav() {
      this.$store.commit('navClose');
    },
    goSignUp() {
      this.$router.push('/signUp');
    },
  },
  computed: {
    isNavOpen() {
      return this.$store.state.isNavOpen;
    },
  },
};
</script>

<style scoped>
.nav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  color: #303030;
  font-family: Cafe24Dangdanghae;
  box-shadow: 0 0 1.5em 0 rgba(0, 0, 0, 0.6);
}
.nav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 20px;
  display: block;
  transition: 0.3s;
  margin-top: 5px;
  height: 22px;
  overflow: hidden;
  word-break: break-all;
}
.nav a:hover {
  color: #f1f1f1;
}
.nav .closebtn {
  float: right;
  font-size: 36px;
  color: #646464;
  margin-right: 10px;
}
.nav a div {
  overflow: hidden;
  word-break: break-all;
  height: 22px;
}
.nav a i {
  margin-right: 5px;
}
.link-wrapper a {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.info {
  height: 130px;
  background-color: #546fc4;
  box-shadow: 0px 5px 5px #d7d2d2;
}
.info span {
  line-height: 60px;
}
.info .icon {
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: middle;
  font-size: 40px;
}
.nav-header {
  box-sizing: border-box;
  height: 40px;
  background-color: #546fc4;
  border-bottom: 1px solid #97969663;
}

@media screen and (max-height: 450px) {
  .nav {
    padding-top: 15px;
  }
  .nav a {
    font-size: 18px;
  }
}
.nav {
  display: inline-block;
}

.nav-open {
  width: 250px;
}

.username-link {
  display: inline-block !important;
  padding: 0px !important;
  vertical-align: middle !important;
  padding-left: 10px !important;
  margin-top: 0px !important;
  height: auto !important;
  font-size: 15px !important;
}
</style>
