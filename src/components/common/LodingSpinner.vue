<template>
  <div class="spinner-container">
    <div class="spinner" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90vh;
}
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid #fe9616;
  animation: spin 1s linear infinite;
  position: relative;
  margin-top: calc(50vh - 25px);
  margin-left: calc(50vw - 25px);
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
