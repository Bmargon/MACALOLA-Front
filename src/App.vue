<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    console.log(process.env.VUE_APP_URL)
  }
}
</script>
<style lang="scss" scoped>
</style>
