<template>
  <div class="chat-item">
    <div v-if="!isSender" class="receive-wrapper">
      <div class="sender">
        seya330
      </div>
      <div class="balloon balloon-receive">
        <p>{{ chatItem.messageContents }}</p>
      </div>
      <span class="time">
        {{ regDateStr }}
      </span>
    </div>

    <div v-else class="send-wrapper">
      <span class="time">
        {{ regDateStr }}
      </span>
      <div class="balloon balloon-send">
        <p>{{ chatItem.messageContents }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    chatItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSender() {
      return this.$store.state.userId == this.chatItem.sendUserId
        ? true
        : false;
    },
    regDateStr() {
      const date = new Date(this.chatItem.regDate);
      let dateStr = '';
      const hour = date.getHours();

      dateStr += hour < 13 ? '오전 ' : '오후 ';
      dateStr += hour < 13 ? hour : hour - 12;
      dateStr += ':' + date.getMinutes();
      return dateStr;
    },
  },
};
</script>

<style>
.chat-item {
  padding: 12px 0px 12px 0px;
}
.receive-wrapper {
  text-align: left;
}
.send-wrapper {
  text-align: right;
}
.balloon {
  position: relative;
  width: fit-content;
  min-width: calc(30% - 30px);
  max-width: calc(70% - 30px);
  height: auto;
  border-radius: 15px;
  overflow-wrap: break-word;
  padding: 10px;
  display: inline-block;
}
.balloon-receive {
  margin-left: 30px;
  background: #e0d8d8de;
}
.balloon-send {
  margin-right: 30px;
  background: #93abf7;
}

.balloon-receive:after {
  border-top: 5px solid transparent;
  border-left: 0px solid transparent;
  border-right: 17px solid #e0d8d8de;
  border-bottom: 5px solid transparent;
  content: '';
  position: absolute;
  top: 10px;
  left: -15px;
}

.balloon-send:after {
  border-top: 5px solid transparent;
  border-left: 17px solid #93abf7;
  border-right: 0px solid transparent;
  border-bottom: 5px solid transparent;
  content: '';
  position: absolute;
  top: 10px;
  right: -15px;
}

.time {
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: bottom;
  color: #b4aeae;
  font-size: 12px;
  font-weight: 900;
}
.sender {
  margin-left: 30px;
  color: #a19898;
}
</style>
