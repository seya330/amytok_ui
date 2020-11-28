<template>
  <div class="banner">
    <div class="sch-area">
      <div class="sch-box">
        <input
          id="srchText"
          type="text"
          placeholder="채팅 Topic 검색"
          v-model="srchText"
          @keyup.enter="searchTopic"
        />
        <div class="sch-btn-box">
          <i class="icon ion-ios-search srch-btn" @click="searchTopic"></i>
          <button class="visit-btn">최근방문</button>
        </div>
      </div>
    </div>
    <div class="srch-result" v-if="srchOpen">
      <div class="srch-result-header">
        <p
          style="margin-left: 10px; line-height: 35px; font-weight: bold; color: #555; font-size: 14px;"
        >
          검색 결과
        </p>
      </div>
      <div class="srch-result-body">
        <TopicSearchItem
          v-for="item in topicChatRoomList"
          :key="item.chatRoomId"
          :topicChatRoom="item"
        ></TopicSearchItem>
        <div
          style="padding: 15px;"
          v-if="srchOpen == true && topicChatRoomList.length == 0"
        >
          <p style="display: inline-block;">검색결과가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopicSearchItem from '@/components/topicChat/TopicSearchItem.vue';
import { authInstance } from '@/api/httpUtil';
export default {
  components: {
    TopicSearchItem,
  },
  mounted() {},
  data() {
    return {
      topicChatRoomList: [],
      srchOpen: false,
      srchText: '',
    };
  },
  methods: {
    async searchTopic() {
      if (this.srchText == '') {
        this.$store.commit('modalOpen', {
          message: '검색어를 입력해 주세요.',
          modalFocusId: 'srchText',
        });
        return;
      }
      try {
        this.$store.commit('spinnerOn');
        let { data } = await authInstance.get(`/topic/search/${this.srchText}`);
        if (!this.srchOpen) this.srchOpen = true;
        this.topicChatRoomList = data;
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.commit('spinnerOff');
      }
    },
  },
};
</script>

<style scoped>
.banner {
  background: #f9fafc;
}
.sch-area {
  width: calc(100vw - 20px);
  padding: 0px;
  margin: 10px;
  box-sizing: border-box;
  border: 1px solid #4b58a7;
  background-color: #fff;
}
.sch-box {
  padding: 0px 125px 0px 10px;
  position: relative;
}
.sch-box input {
  width: 100%;
  height: 24px;
  padding: 5px 0px 5px 0px;
  border: 0;
  margin: 1px 0px;
}
.sch-btn-box {
  position: absolute;
  right: 0;
  top: 0;
  color: #000;
}
.srch-btn {
  height: 35px;
  font-size: 25px;
  color: #4b58a7;
}
.visit-btn {
  box-sizing: border-box;
  border: 0;
  background: none;
  margin-left: 10px;
  margin-right: 10px;
  height: 35px;
  line-height: 1.6;
  font-weight: bold;
  vertical-align: top;
  color: #555;
  position: relative;
}
.visit-btn:before {
  content: '';
  display: inline-block;
  width: 1px;
  height: 20px;
  background-color: #e1e3ef;
  margin-right: 10px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.srch-result {
}
.srch-result-header {
  box-sizing: border-box;
  height: 35px;
  background-color: #e8e4e4;
  border: 1px solid #dbdbdb;
}
.srch-result-body {
}
</style>
