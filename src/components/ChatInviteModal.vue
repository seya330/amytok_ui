<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="header-one">
              <i
                class="icon ion-ios-close"
                style="font-size: 25px;
                font-weight: 100;
                padding: 0px 3px 0px 3px;"
                @click="modalClose"
              ></i>
              <p
                style="display: inline-block; margin-left: 10px; color: #2c2b2b;"
              >
                대화상대 초대
              </p>

              <button class="invite-btn" @click="invite">초대</button>
            </div>
            <div class="check-user-container">
              <CheckUserItem
                v-for="checkedUser in checkedUserList"
                :key="checkedUser.uniqId"
                :userItem="checkedUser"
                @deleteCheckUser="checkClick(false, ...arguments)"
              ></CheckUserItem>
            </div>
            <div class="body-header">
              <div class="header-two">
                <input
                  type="search"
                  class="srch-input"
                  placeholder="ID로 검색"
                  @keyup.13="search"
                  v-model="srchText"
                />
              </div>
              <div class="header-three"></div>
            </div>
          </div>
          <div class="modal-body">
            <div>
              <UserItem
                v-for="srchUser in srchUserList"
                :key="srchUser.uniqId"
                :srchUser="srchUser"
                @checkClick="checkClick"
                :ref="srchUser.uniqId"
              ></UserItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserItem from '@/components/InviteModalUserItem.vue';
import CheckUserItem from '@/components/InviteCheckUserItem.vue';
import { authInstance } from '@/api/httpUtil';
export default {
  created() {},
  components: {
    UserItem,
    CheckUserItem,
  },
  mounted() {
    const modalBody = document.getElementsByClassName('modal-body')[0];
    modalBody.style.height = window.innerHeight - 400 + 'px';
  },
  data() {
    return {
      srchText: '',
      srchUserList: [],
      checkedUserList: [],
    };
  },
  methods: {
    modalClose() {
      this.$emit('closeModal');
    },
    async search() {
      if (this.srchText == '') {
        alert('검색할 ID를 입력해 주세요.');
        return;
      }
      let { data } = await authInstance.get('/user/search', {
        params: {
          'searchVO.userId': this.srchText,
        },
      });
      this.srchUserList = data;
      this.$nextTick(() => {
        for (let index in this.checkedUserList) {
          if (this.$refs[this.checkedUserList[index].uniqId].length > 0) {
            this.$refs[this.checkedUserList[index].uniqId][0].check();
          }
        }
      });
    },
    checkClick(isChecked, userItem) {
      if (isChecked) {
        this.checkedUserList.push(userItem);
      } else {
        let index = this.checkedUserList.findIndex(item => {
          return item.uniqId === userItem.uniqId;
        });
        if (index > -1) {
          this.checkedUserList.splice(index, 1);
          if (this.$refs[userItem.uniqId].length > 0)
            this.$refs[userItem.uniqId][0].uncheck();
        }
      }
    },
    async invite() {
      if (this.checkedUserList.length < 1) {
        alert('초대할 사용자를 선택하세요.');
        return;
      }
      let inviteUniqIdList = [];
      for (let index in this.checkedUserList) {
        inviteUniqIdList.push(this.checkedUserList[index].uniqId);
      }
      let { data } = await authInstance.post('/chat/invite', {
        inviteUniqIdList,
      });

      this.$router.push(`/chatRoom/${data.chatRoomVO.chatRoomId}`);
    },
  },
};
</script>

<style scoped>
.srch-input {
  width: calc(95%);
  height: 25px;
  border: none;
  border-radius: 5px;
  padding: 1px 4px 1px 4px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 85vw;
  margin: 0px auto;
  border-radius: 13px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Cafe24Dangdanghae;
  border: 1px solid #676767;
  box-sizing: border-box;
  border: 1px solid #535252;
}

.modal-header {
  box-sizing: border-box;
  background-color: #546fc4;
  padding: 8px 10px 8px 10px;
  border-radius: 10px 10px 0px 0px;
  border-top: 1px solid #535252;
}

.modal-header h3 {
  margin: 0;
}

.modal-body {
  overflow: auto;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-enter-active .modal-container {
  -webkit-transform: scale(3.1);
  transform: scale(3.1);
}
.body-header {
  background-color: #546fc4;
  padding: 10px;
}
.header-two {
  text-align: center;
}
.check-user-container {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}
.invite-btn {
  font-family: Cafe24Dangdanghae;
  font-size: 15px;
  padding: 5px 10px 5px 10px;
  background-color: #c0baba;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #514d4d;
  border: none;
  float: right;
  color: #2c2b2b;
}
</style>
