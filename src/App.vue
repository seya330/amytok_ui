<template>
  <div id="app">
    <Navigation></Navigation>
    <div id="main" ref="main" class="main">
      <UpHeader></UpHeader>
      <router-view />
    </div>
    <div
      class="shadow-cover"
      :style="{ display: coverDisplay }"
      @click="closeNav()"
    ></div>
    <Modal v-if="$store.state.isModalOpen">
      <template v-slot:body>{{ $store.state.alertMessage }}</template>
      <template v-slot:footer></template>
    </Modal>
    <loadingSpinner v-if="$store.state.isSpinnerView"></loadingSpinner>
  </div>
</template>

<script>
import UpHeader from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';
import Modal from '@/components/common/Modal.vue';
import loadingSpinner from '@/components/common/LodingSpinner.vue';

export default {
  data() {
    return {};
  },
  components: {
    UpHeader,
    Navigation,
    Modal,
    loadingSpinner,
  },
  methods: {},
  computed: {
    isNavOpen() {
      const isOpen = this.$store.state.isNavOpen;
      return isOpen;
    },
    coverDisplay() {
      return this.$store.state.isNavOpen ? 'block' : 'none';
    },
  },
  methods: {
    closeNav() {
      this.$store.commit('navClose');
    },
  },
};
</script>
<style>
@import './css/common.css';
#main {
  transition: margin-left 0.5s;
}
.shadow-cover {
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.5s;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
@font-face {
  font-family: 'Cafe24Dangdanghae';
  src: local('Cafe24Dangdanghae'),
    url(./fonts/Cafe24Dangdanghae.ttf) format('truetype');
}
</style>
