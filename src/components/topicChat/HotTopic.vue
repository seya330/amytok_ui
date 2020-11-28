<template>
  <div class="hot-topic-area">
    <div>
      <span
        style="display: inline-block; background-color: #546fc4; padding: 5px; border-radius: 3px; color: #e6e6e6; margin: 5px;"
        >실시간 핫 채팅 Topic</span
      >
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank hot">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank hot">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
    <div class="hot-topic-item">
      <div class="hot-topic-item-rank">1</div>
      <div class="hot-topic-item-topic">제목입니다.</div>
      <div class="hot-topic-item-change">@</div>
    </div>
  </div>
</template>

<script scoped>
export default {};
</script>

<style>
.hot-topic-area {
  border-top: 1px solid #546fc4;
  box-sizing: border-box;
  background-color: white;
}

.hot-topic-item {
  display: grid;
  grid-template-areas: 'rank topic change';
  grid-template-columns: 1fr 8fr 1fr;
  background-color: white;
}

.hot-topic-item-rank {
  grid-area: rank;
  padding: 5px 1px;
  text-align: center;
}

.hot {
  color: red;
}

.hot-topic-item-topic {
  grid-area: topic;
  padding: 5px 1px;
}

.hot-topic-item-change {
  grid-area: change;
  padding: 5px 1px;
}
</style>
