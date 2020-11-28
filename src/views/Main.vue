<template>
  <div class="contents-root">
    <TopicSearch></TopicSearch>
    <div class="link-area">
      <span style="display: inline-block; width: 50vw;  text-align: center;">
        <i
          class="ion-ios-shuffle"
          style="font-size: 20vw; color: #555;"
          @click="$router.push('/randomChat')"
        ></i>
        <p>랜덤채팅</p>
      </span>
      <span style="display: inline-block; width: 50vw; text-align: center;">
        <i
          class="icon ion-ios-chatboxes"
          style="font-size: 20vw; color: #555;"
          @click="$router.push('/chatlist')"
        ></i>
        <p>메신저</p>
      </span>
    </div>
    <HotTopic></HotTopic>
  </div>
</template>

<script>
import TopicSearch from '@/components/topicChat/TopicSearch.vue';
import HotTopic from '@/components/topicChat/HotTopic.vue';
export default {
  components: {
    TopicSearch,
    HotTopic,
  },
};
</script>

<style>
.link-area {
  padding: 20px 0px 30px 0px;
}
</style>
