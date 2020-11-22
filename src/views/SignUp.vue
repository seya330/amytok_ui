<template>
  <div class="contents-root">
    <div style="text-align: center; height: 200px; line-height: 200px">
      <img src="@/assets/amyutok_logo.png" style="width: 200px;" />
    </div>
    <div class="text-center">
      <form class="login-form">
        <div class="text-left" style="font-weight: 900; margin: 20px 0 20px 0;">
          회원가입
        </div>
        <input
          type="text"
          class="login-input"
          placeholder="ID를 입력하세요."
          v-model="userId"
          @keyup="isOverlap"
        />
        <div
          v-if="overlap"
          style="color: red; text-align: left; font-size: 12px;"
        >
          ID가 중복됩니다.
        </div>

        <input
          type="password"
          class="login-input"
          style="margin-top: 30px;"
          placeholder="PASSWORD를 입력 하세요."
          v-model="password"
        />

        <input
          type="password"
          class="login-input"
          style="margin-top: 30px;"
          placeholder="PASSWORD를 다시 입력 하세요."
          v-model="password2"
        />
        <div
          v-if="!isPasswordEqual"
          style="color: red; text-align: left; font-size: 12px;"
        >
          PASSWORD가 다릅니다.
        </div>
        <div class="login-btn-wrapper">
          <button class="login-btn" @click.prevent="signUp">
            회원가입
          </button>
        </div>
        <div class="error-message">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { instance } from '@/api/httpUtil';
export default {
  data() {
    return {
      userId: '',
      password: '',
      password2: '',
      errorMsg: '',
      overlap: false,
    };
  },
  methods: {
    async signUp() {
      try {
        if (
          !this.overlap &&
          this.isPasswordEqual &&
          this.userId != '' &&
          this.password != ''
        ) {
          await instance.post('/user/add', {
            userId: this.userId,
            password: this.password,
          });
          this.$store.commit('modalOpen', '회원가입이 완료 되었습니다.');
          this.$router.push('/login');
        } else {
          this.$store.commit(
            'modalOpen',
            '회원가입 정보를 다시 확인해 주세요.',
          );
        }
      } catch (error) {}
    },
    async isOverlap() {
      if (this.userId != '') {
        let { data } = await instance.get(`/user/isOverlap/${this.userId}`);
        this.overlap = data;
      }
    },
  },
  computed: {
    isPasswordEqual() {
      return this.password === this.password2;
    },
  },
};
</script>

<style>
.login-form {
  width: 300px;
  display: inline-block;
  background-color: white;
  padding: 30px 15px 30px 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #dddcdc;
  border: 1px solid #dddcdc;
}
.login-input {
  width: 100%;
  border: none;
  background: none;
  border-bottom: 1px solid grey;
  height: 35px;
  box-sizing: border-box;
  outline-color: #a7a7a7;
}
.login-btn-wrapper {
  margin-top: 40px;
  text-align: right;
}
.login-btn {
  padding: 10px;
  border: 2px solid #b7aeae;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #d3d3d3bf;
}
.error-message {
  text-align: left;
  color: #da5252;
  font-size: 12px;
  font-weight: 800;
}
</style>
