<template>
  <div class="contents-root">
    <TopicSearch></TopicSearch>
    <RecentVisit></RecentVisit>
    <HotTopic></HotTopic>
  </div>
</template>

<script>
import TopicSearch from '@/components/topicChat/TopicSearch.vue';
import HotTopic from '@/components/topicChat/HotTopic.vue';
import RecentVisit from '@/components/topicChat/RecentVisit.vue';
export default {
  components: {
    TopicSearch,
    HotTopic,
    RecentVisit,
  },
};
</script>

<style></style>
