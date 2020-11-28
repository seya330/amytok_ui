<template>
  <div class="srch-item" @click="goChatRoom">
    <p>
      {{ topicChatRoom.chatTopic }}
    </p>
    <i
      class="icon ion-ios-arrow-forward"
      style="float: right; font-size: 25px; padding: 0px 10px 0px 10px; color: #e8e4e4;"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    topicChatRoom: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goChatRoom() {
      this.$router.push(`/topicChatRoom/${this.topicChatRoom.chatRoomId}`);
    },
  },
};
</script>

<style scoped>
.srch-item {
  height: 35px;
  border-bottom: 1px solid #e8e4e4;
}
.srch-item p {
  display: inline-block;
  padding-left: 10px;
  line-height: 35px;
}
</style>
