<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    // OBTENER JSON GENERICO DEL SERVIDOR
    console.log(process.env.VUE_APP_URL)
  }
}
</script>
<style lang="scss" scoped>
</style>
