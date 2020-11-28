<template>
  <div style="background-color: white; border-top: 1px solid #546fc4;">
    <div class="select-area">
      <div class="select-item-container">
        <span class="select-item"><p>최근 방문</p></span>
      </div>
      <div class="select-item-container">
        <span class="select-item"><p>즐겨찾기</p></span>
      </div>
    </div>
    <div>
      <table style="width: 100%; border-collapse: collapse;">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead></thead>
        <tbody>
          <tr class="table-row" v-for="(view, index) in viewList" :key="index">
            <td @click="goChatRoom(view[0].chatRoomId)">
              <p>{{ view[0].chatTopic }}</p>
            </td>
            <td v-if="view[1]" @click="goChatRoom(view[1].chatRoomId)">
              <p>
                {{ view[1].chatTopic }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { authInstance } from '@/api/httpUtil';

export default {
  mounted() {
    this.getVisitList();
  },
  data() {
    return {
      viewList: [],
    };
  },
  methods: {
    async getVisitList() {
      let { data } = await authInstance.get('/topic/visitList');
      let visitList = data.topicRoomVisitList;
      console.log(visitList);
      let length = parseInt(visitList.length / 2);
      length += visitList.length % 2 == 0 ? 0 : 1;
      console.log(length);
      const itemList = [];
      for (let i = 0; i < length; i++) {
        let arr = [];
        arr.push(visitList[i * 2]);
        if (visitList.length > i * 2 + 1) {
          arr.push(visitList[i * 2 + 1]);
        }
        itemList.push(arr);
      }
      this.viewList = itemList;
      console.log(itemList);
    },
    goChatRoom(chatRoomId) {
      this.$router.push(`/topicChatRoom/${chatRoomId}`);
    },
  },
};
</script>

<style scoped>
.select-area {
  height: 40px;
  box-sizing: border-box;
  background-color: rgb(84, 111, 196);
}
.select-item-container {
  box-sizing: border-box;
  width: 50%;
  display: inline-block;
  text-align: center;
  height: 40px;
}
.select-item {
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  width: 80%;
  height: 34px;
  margin-top: 3px;
  border-radius: 20px;
}
.select-item p {
  line-height: 34px;
  color: #eaeaea;
}
.table-row {
  height: 40px;
}
.table-row td {
  box-sizing: border-box;
  border: 1px solid #dedede;
}
.table-row td p {
  padding-left: 5px;
}
span {
  display: inline-block;
}
</style>
