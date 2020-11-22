<template>
  <div class="invite-modal-user-item">
    <div class="grid-container">
      <div class="grid-image">
        <img
          src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
          class="profile-image"
        />
      </div>
      <div class="grid-user-id">
        <p class="vertical-middle">{{ srchUser.userId }}</p>
      </div>
      <div class="grid-check-btn">
        <input
          :id="srchUser.uniqId"
          class="vertical-middle"
          type="checkbox"
          v-model="isChecked"
          @change="clickChkBtn()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    srchUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    clickChkBtn() {
      this.$emit('checkClick', this.isChecked, this.srchUser);
    },
    check() {
      this.isChecked = true;
    },
    uncheck() {
      this.isChecked = false;
    },
  },
};
</script>

<style scoped>
.invite-modal-user-item {
  border-bottom: 1px solid #c5c2c2b0;
  box-sizing: border-box;
}
.profile-image {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: 10px;
}
.grid-container {
  display: grid;
  grid-template-areas: 'image user-id btn';
  grid-template-columns: 1fr 5fr 1fr;
}
.grid-image {
  grid-area: image;
}
.grid-user-id {
  grid-area: user-id;
  align-content: center;
}
.grid-check-btn {
  grid-area: btn;
}
</style>
