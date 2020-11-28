<template>
  <div class="contents-root chat-list">
    <div class="chat-list-header">
      <!-- <span class="font-size-big vertical-middle">채팅방</span> -->
      <span class="vertical-middle invite-text">초대하기</span>
      <i
        class="icon ion-ios-search vertical-middle srch-btn"
        @click="inviteModalOpen = true"
      ></i>
    </div>
    <div class="chat-list-content">
      <ChatRoomItem
        v-for="chatRoom in chatRoomList"
        :key="chatRoom.chatRoomId"
        :chatRoomItem="chatRoom"
        :ref="chatRoom.chatRoomId"
      ></ChatRoomItem>
    </div>
    <ChatInviteModal
      @closeModal="closeModal"
      v-if="inviteModalOpen"
    ></ChatInviteModal>
  </div>
</template>

<script>
import ChatRoomItem from '@/components/ChatRoomItem.vue';
import { authInstance } from '@/api/httpUtil';
import ws from '@/api/websocket';
import ChatInviteModal from '@/components/ChatInviteModal.vue';

export default {
  data() {
    return {
      chatRoomList: [],
      inviteModalOpen: false,
    };
  },
  components: {
    ChatRoomItem,
    ChatInviteModal,
  },
  async mounted() {
    this.$store.commit('spinnerOn');
    const { data } = await authInstance.get('/chat/groupChat/chatRoomList');
    this.chatRoomList = data;
    await ws.wsConnect({ chatType: 'GROUPCHAT' }, true);
    ws.subscribe(
      '/public.' + this.$store.state.uniqId + '.message',
      ({ body }) => {
        body = JSON.parse(body);
        let index = this.chatRoomList.findIndex(item => {
          return item.chatRoomId === body.chatRoomId;
        });
        if (index > -1) {
          this.chatRoomList[index].unreadCnt++;
          this.chatRoomList[index].summary = body.messageContents;
          this.chatRoomList[index].msgRegDate = body.regDate;
        } else {
          this.refreshChatRoomList();
        }
      },
    );
    this.$store.commit('spinnerOff');
  },
  methods: {
    closeModal() {
      this.inviteModalOpen = false;
    },
    async refreshChatRoomList() {
      const { data } = await authInstance.get('/chat/groupChat/chatRoomList');
      this.chatRoomList = data;
    },
  },
};
</script>

<style scoped>
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
