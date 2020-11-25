<template>
  <div class="contents-root">
    <div class="chat-box" @scroll="chatBoxScroll()">
      <div id="chatboxContents">
        <messageItem
          v-for="(item, index) in messageItemList"
          :key="item.senderSessionId + index"
          :chatItem="item"
          :sessionId="sessionId"
        ></messageItem>
      </div>
    </div>
    <div class="chat-input-wrapper">
      <template v-if="isConnected">
        <input
          id="chatMessage"
          type="text"
          v-model="chatMessage"
          @focus="viewportUtilV.fixIosWindowScroll"
          @blur="viewportUtilV.removeFixIosWindowScroll"
          @keyup.enter="sendMessage"
        />
        <span class="send-btn" @click="sendMessage">전송</span>
      </template>
      <template v-else>
        <div class="connect-btn" @click="findRanChatUser" v-if="!isWaiting">
          상대 찾기..
        </div>
        <div
          class="connect-btn"
          @click="cancelWaiting"
          v-else
          style="z-index: 9999 !important;"
        >
          취소
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import randomChat from '@/js/RandomChat';
import ws from '@/api/websocket';
import messageItem from '@/components/RanChatMessageItem';
import viewportUtil from '@/utils/viewportUtil';
export default {
  data() {
    return {
      messageItemList: [],
      chatMessage: '',
      isConnected: false,
      isWaiting: false,
      chatRoomId: '',
      sessionId: '',
      viewportUtilV: viewportUtil,
    };
  },
  async created() {},
  async mounted() {
    this.sessionId = Math.random()
      .toString(36)
      .substring(2);
    viewportUtil.chatBoxSizeFix();
    window.visualViewport.addEventListener(
      'resize',
      viewportUtil.chatBoxSizeFix,
    );
  },
  beforeDestroy() {
    window.visualViewport.removeEventListener(
      'resize',
      viewportUtil.chatBoxSizeFix,
    );
  },
  updated() {},
  components: {
    messageItem,
  },
  methods: {
    sendMessage() {
      document.getElementById('chatMessage').focus();
      if (this.chatMessage == '') {
        this.$store.commit('modalOpen', '메세지를 입력해 주세요.');
        return;
      }
      ws.sendMessage(`/chat.message/${this.chatRoomId}`, {
        senderSessionId: this.sessionId,
        message: this.chatMessage,
        messageType: 'CHAT',
      });
      this.chatMessage = '';
    },
    async chatBoxScroll() {},
    async findRanChatUser() {
      this.messageItemList = [];
      this.$store.commit('spinnerOn');
      this.isWaiting = true;

      try {
        let data = await randomChat.findRanChatUser(this);
        this.chatRoomId = data.chatRoomId;
        this.sessionId = data.sessionId;
        if (data.responseResult == 'CANCEL') {
          this.$store.commit('modalOpen', '취소되었습니다.');
          return;
        }
        await ws.wsConnect(
          { chatType: 'RANDOM', chatRoomId: this.chatRoomId },
          false,
        );
        await ws.subscribe(`/chat/${data.chatRoomId}`, result => {
          let { body } = result;
          body = JSON.parse(body);

          if (body.messageType == 'CHAT') {
            this.messageItemList.push(body);
          } else if (body.messageType == 'DISCONNECTED') {
            body.message = '상대방이 접속을 종료 하였습니다.';
            this.messageItemList.push(body);
            this.isConnected = false;
            ws.disconnect();
          }
          this.$nextTick(() => {
            const chatBox = document.getElementsByClassName('chat-box')[0];
            chatBox.scrollTop = chatBox.scrollHeight;
          });
        });
        this.isConnected = true;
        this.isWaiting = false;
      } catch (error) {
        if (error.response.status == 408) {
          this.$store.commit('modalOpen', '대화상대를 찾는데 실패하였습니다.');
        }
      } finally {
        this.isWaiting = false;
        this.$store.commit('spinnerOff');
      }
    },
    async cancelWaiting() {
      await randomChat.cancelWaiting(this);
    },
  },
};
</script>

<style>
.chat-box {
  height: calc(100% - 50px - 40px);
  overflow: auto;
}
.chat-input-wrapper {
  height: 40px;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  border: 2px solid #b7b4b4;
  border-radius: 15px;
}
.chat-input-wrapper input {
  height: 35px;
  width: calc(100% - 60px);
  box-sizing: border-box;
  vertical-align: middle;
  border: none;
  background: none;
  padding: 0px 10px 0px 10px;
  outline: none;
}
.send-btn {
  width: 60px;
  height: 34px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 31px;
  background-color: #b7b4b4;
  border-radius: 15px;
  border: 2px solid #b0afaf;
  box-sizing: border-box;
}
.connect-btn {
  height: 40px;
  display: block;
  text-align: center;
  line-height: 31px;
  background-color: #b7b4b4;
  border-radius: 12px;
  border: 2px solid #b0afaf;
  box-sizing: border-box;
}
</style>
