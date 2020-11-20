<template>
  <div class="contents-root">
    <div style="text-align: center; height: 200px; line-height: 200px">
      <img src="@/assets/amyutok_logo.png" style="width: 200px;" />
    </div>
    <div class="text-center">
      <form class="login-form">
        <div class="text-left" style="font-weight: 900; margin: 20px 0 20px 0;">
          로그인
        </div>
        <input
          type="text"
          class="login-input"
          placeholder="ID를 입력하세요."
          v-model="userId"
        />

        <input
          type="password"
          class="login-input"
          style="margin-top: 30px;"
          placeholder="PASSWORD를 입력하세요."
          v-model="password"
        />
        <div class="login-btn-wrapper">
          <button class="login-btn" @click.prevent="login">
            로그인
          </button>
        </div>
        <div class="error-message">{{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      password: '',
      errorMsg: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          userId: this.userId,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        console.log(error.response);
        if (error.response.status == 401) {
          switch (error.response.data) {
            case 'INVALID_ID':
              this.errorMsg = 'ID가 없습니다.';
              break;
            case 'INVALID_PASSWORD':
              this.errorMsg = '비밀번호를 다시 입력해 주세요.';
              break;
          }
        } else {
          this.errorMsg =
            '알수 없는 에러가 발생하였습니다. 관리자에게 문의해 주세요.';
        }
      }
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
