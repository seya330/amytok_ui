<template>
  <div class="chat-room-item" @click="goChatRoom(chatRoomItem.chatRoomId)">
    <div class="grid-container">
      <div class="grid-image">
        <img
          src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
          class="profile-image"
        />
      </div>

      <div class="grid-name">
        <p class="vertical-middle ellipses">{{ joinnerListStr }}</p>
      </div>

      <div class="grid-date">
        <p class="vertical-middle" style="font-size: 12px;">{{ msgDateStr }}</p>
      </div>

      <div class="grid-content">
        <p class="vertical-middle message-summary">
          {{ chatRoomItem.summary }}
        </p>
      </div>
      <div class="grid-cnt" v-if="chatRoomItem.unreadCnt > 0">
        <p class="vertical-middle">{{ chatRoomItem.unreadCnt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFormatDate,
  getFormatDate2,
  getFormatDate4,
} from '@/utils/dateUtil';
export default {
  props: {
    chatRoomItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goChatRoom(id) {
      this.$router.push(`/chatRoom/${id}`);
    },
  },
  computed: {
    joinnerListStr() {
      let str = '';
      for (let joinner in this.chatRoomItem.joinnerList) {
        if (str != '') str += ',';
        str += this.chatRoomItem.joinnerList[joinner].userId;
      }
      return str;
    },
    msgDateStr() {
      let msgDate = new Date(this.chatRoomItem.msgRegDate);
      let today = new Date(getFormatDate(new Date()) + ' 23:59:59');
      if (today.getTime() - msgDate.getTime() >= 86400000) {
        return getFormatDate2(msgDate);
      } else {
        return getFormatDate4(msgDate);
      }
    },
  },
};
</script>

<style>
.chat-room-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  color: #555;
  font-size: 1rem;
}
.chat-room-item .profile-image {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px;
}
.chat-room-item h6 {
  margin: 0;
}
.chat-room-item p {
  display: inline-block;
  margin: 0 0 0 5px;
}
.grid-container {
  display: grid;
  grid-template-areas:
    'image name date'
    'image content cnt';
  grid-template-columns: 1fr 4fr 1fr;
}
.grid-container div {
  position: relative;
}
.grid-image {
  grid-area: image;
}
.grid-name {
  grid-area: name;
  position: relative;
}
.grid-date {
  grid-area: date;
  position: relative;
}
.grid-content {
  grid-area: content;
  position: relative;
}
.grid-cnt {
  grid-area: cnt;
  position: relative;
  text-align: center;
}
.grid-cnt p {
  margin: 0;
  background-color: #f66d6d;
  padding: 1px 10px 1px 10px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
}
.message-summary {
  color: #555555c7;
}
.ellipses {
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
