<template>
  <header
    id="header"
    class="header"
    :class="isNavOpen ? 'nav-open-opacity' : null"
  >
    <span class="nav-open-icon" @click="openNav">
      <i class="icon ion-md-menu"></i>
    </span>

    <img src="@/assets/amyutok_logo.png" style="height: 50px; float: right;" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  components: {},
  methods: {
    openNav() {
      this.$store.commit('navOpen');
    },
  },
  computed: {
    isNavOpen() {
      return this.$store.state.isNavOpen;
    },
  },
};
</script>

<style>
.nav-open-icon {
  font-size: 35px;
  margin-left: 15px;
  color: white;
  float: left;
}
.header {
  display: block;
  background: #546fc4;
  height: 50px;
  width: 100%;
  font-weight: 400;
  position: fixed;
  z-index: 1;
  text-align: center;
}
.nav-open-opacity {
  opacity: 0.5;
}
</style>
