<template>
  <div class="contents-root">
    <div class="chat-box">
      <ChatItem
        v-for="chatItem in chatItemList"
        :key="chatItem.messageId"
        :chatItem="chatItem"
      ></ChatItem>
    </div>
    <div class="chat-input-wrapper">
      <input type="text" v-model="chatMessage" />
      <span class="send-btn" @click="sendMessage">전송</span>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem.vue';
import chatRoomScript from '@/js/ChatRoom';
import ws from '@/api/websocket';
export default {
  async created() {
    this.chatItemList = await chatRoomScript.getMessageList(this.chatRoomId);
  },
  async mounted() {
    chatRoomScript.chatBoxSizeFix();
    chatRoomScript.scrollBottom();
    console.log('wsconnect start');
    await ws.wsConnect();
    console.log('wsconnect end');
    chatRoomScript.subChatRoom(this.chatRoomId, this);
  },
  updated() {},
  components: {
    ChatItem,
  },
  data() {
    return {
      chatRoomId: this.$route.params.chatRoomId,
      chatItemList: [],
      chatMessage: '',
    };
  },
  methods: {
    sendMessage() {
      chatRoomScript.sendMessage(this.chatMessage, this.chatRoomId);
      this.chatMessage = '';
    },
  },
  watch: {
    chatItemList() {
      const chatBoxa = document.getElementsByClassName('chat-box')[0];
      this.$nextTick(() => {
        // Scroll Down
        chatRoomScript.scrollBottom();
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
