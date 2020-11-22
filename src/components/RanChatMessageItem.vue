<template>
  <div class="chat-item">
    <div v-if="!isSender" class="receive-wrapper">
      <div class="balloon balloon-receive">
        <p>{{ chatItem.message }}</p>
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
        <p>{{ chatItem.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormatDate4 } from '@/utils/dateUtil';
export default {
  created() {},
  props: {
    chatItem: {
      type: Object,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSender() {
      return this.sessionId == this.chatItem.senderSessionId ? true : false;
    },
    regDateStr() {
      const date = new Date(this.chatItem.sendDate);
      return getFormatDate4(date);
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
