<template>
  <div class="contents-root chat-list">
    <div class="chat-list-header">
      <!-- <span class="font-size-big vertical-middle">채팅방</span> -->
      <span class="vertical-middle invite-text">초대하기</span>
      <i class="icon ion-ios-search vertical-middle srch-btn"></i>
    </div>
    <div class="chat-list-content">
      <ChatRoomItem
        v-for="chatRoom in chatRoomList"
        :key="chatRoom.chatRoomId"
        :chatRoomItem="chatRoom"
      ></ChatRoomItem>
    </div>
  </div>
</template>

<script>
import ChatRoomItem from '@/components/ChatRoomItem.vue';
import { authInstance } from '@/api/httpUtil';
import ws from '@/api/websocket';
export default {
  data() {
    return {
      chatRoomList: [],
    };
  },
  components: {
    ChatRoomItem,
  },
  methods: {},
  async mounted() {
    const { data } = await authInstance.get('/chat/groupChat/chatRoomList');
    this.chatRoomList = data;
  },
};
</script>

<style>
.chat-list {
  font-family: Cafe24Dangdanghae;
}
.chat-list-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  height: 40px;
  position: fixed;
  z-index: 1;
  width: 100%;
}
.font-size-big {
  font-size: 20px;
}
.chat-list-content {
  padding-top: 40px;
}
.srch-btn {
  top: 50%;
  transform: translate(-30%, -50%);
  right: 0%;
  font-size: 25px;
  padding: 4px 15px 1px 15px;
  background-color: #c0baba;
  border-radius: 7px;
  box-shadow: 1px 1px 2px #514d4d;
}
.invite-text {
  right: 0%;
  transform: translate(-70px, -50%);
  color: #979797bf;
  font-size: 13px;
}
</style>
