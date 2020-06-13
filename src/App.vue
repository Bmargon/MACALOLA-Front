<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions(['setGloablConfig']),
    async getGlobalConfig () {
      let url = process.env.VUE_APP_URL + '/set-config'
      try {
        let response = await axios.get(url)
        this.setGloablConfig(response.data.data)
        console.log(response);
      } catch (error) {
        
      }
    }
  },
  mounted() {
    this.getGlobalConfig()
  }
}
</script>
<style lang="scss" scoped>
</style>
