<template>
  <span class="item-root">
    <img
      src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
      class="profile-image"
    />
    <p class="user-id">asdasdasd</p>
    <i class="icon ion-ios-close-circle delete-btn" @click="deleteItem"></i>
  </span>
</template>

<script>
export default {
  props: {
    userItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.$emit('deleteCheckUser', this.userItem);
    },
  },
};
</script>

<style>
.item-root {
  display: inline-block;
  text-align: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  position: relative;
}
.item-root img {
  width: 40px;
  height: 40px;
}
.user-id {
  font-weight: 100;
  padding-left: 3px;
  width: 50px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-family: 'Malgun Gothic';
  font-size: 12px;
  font-weight: 500;
}
.delete-btn {
  color: grey;
  position: absolute;
  right: 1px;
  top: 1px;
  font-size: 20px;
}
</style>
