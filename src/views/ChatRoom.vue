<template>
  <div class="contents-root">
    <div class="chat-box" @scroll="chatBoxScroll()">
      <div id="chatboxContents">
        <ChatItem
          v-for="chatItem in chatItemList"
          :key="chatItem.messageId"
          :chatItem="chatItem"
        ></ChatItem>
      </div>
    </div>
    <div class="chat-input-wrapper">
      <input
        id="chatMessage"
        type="text"
        v-model="chatMessage"
        @focus="viewportUtilV.fixIosWindowScroll"
        @blur="viewportUtilV.removeFixIosWindowScroll"
      />
      <span class="send-btn" @click="sendMessage">전송</span>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem.vue';
import chatRoomScript from '@/js/ChatRoom';
import ws from '@/api/websocket';
import viewportUtil from '@/utils/viewportUtil';
export default {
  async created() {},
  async mounted() {
    window.visualViewport.addEventListener(
      'resize',
      viewportUtil.chatBoxSizeFix,
    );
    viewportUtil.chatBoxSizeFix();
    this.$store.commit('spinnerOn');
    await ws.wsConnect({ chatType: 'GROUPCHAT' }, true);
    chatRoomScript.subChatRoom(this.chatRoomId, this);
    this.chatItemList = await chatRoomScript.getMessageListInit(
      this,
      this.chatRoomId,
    );
    this.$nextTick(() => {
      chatRoomScript.scrollBottom();
      if (
        document.getElementById('chatboxContents').clientHeight <
        document.getElementsByClassName('chat-box')[0].clientHeight
      ) {
        this.chatBoxScroll();
      }
      chatRoomScript.scrollBottom();
    });
    this.$store.commit('spinnerOff');
  },
  beforeDestroy() {
    window.visualViewport.removeEventListener(
      'resize',
      viewportUtil.chatBoxSizeFix,
    );
  },
  components: {
    ChatItem,
  },
  data() {
    return {
      chatRoomId: this.$route.params.chatRoomId,
      chatItemList: [],
      chatMessage: '',
      viewingPageNo: 1,
      maxPageNo: 0,
      viewportUtilV: viewportUtil,
    };
  },
  methods: {
    sendMessage() {
      document.getElementById('chatMessage').focus();
      if (this.chatMessage == '') {
        alert('메세지를 입력해 주세요');
        return;
      }
      chatRoomScript.sendMessage(this.chatMessage, this.chatRoomId);
      this.chatMessage = '';
    },
    async chatBoxScroll() {
      this.$store.commit('spinnerOn');
      if (document.getElementsByClassName('chat-box')[0].scrollTop == 0) {
        if (this.viewingPageNo + 1 > this.maxPageNo) {
        } else {
          this.viewingPageNo++;
          let originHeight = document.getElementById('chatboxContents')
            .clientHeight;
          let temp = await chatRoomScript.getMessageList(this);
          let temp2 = temp.concat(this.chatItemList);
          this.chatItemList = temp2;

          this.$nextTick(() => {
            let changedHeight = document.getElementById('chatboxContents')
              .clientHeight;
            document.getElementsByClassName('chat-box')[0].scrollTop =
              changedHeight - originHeight;
          });
        }
      }
      this.$store.commit('spinnerOff');
    },
  },
  watch: {
    chatItemList() {
      const chatBoxa = document.getElementsByClassName('chat-box')[0];
      this.$nextTick(() => {
        // Scroll Down
        //chatRoomScript.scrollBottom();
      });
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
</style>
