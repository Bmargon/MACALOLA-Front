<template>
<div>
  <b-navbar toggleable="lg" type="light" class="bg-white" :sticky="true" variant="info">
    <b-navbar-brand>
      <router-link :to="{name: 'home'}">
        <img class="ml-4" src="https://res.cloudinary.com/macalola/image/upload/v1588232928/logo/logo_o2hsci.png" alt="">
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="mx-auto" center>
        <b-nav-item :to="{name: 'home'}">HOME</b-nav-item>
        <b-nav-item :to="{path: '/c/ofertas'}">OFERTAS</b-nav-item>

        <b-nav-item-dropdown text="PRODUCTOS" right>
          <b-dropdown-item v-for="(item, i) in categories" :key="i" @click="handleCategory(item)">{{item.name}}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item :to="{name: 'contact'}" >CONTACTANOS</b-nav-item>

        <b-nav-item href="#">F.A.Q.</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="">

        
        <div class="user-actions">
            <div class="nav-item">
                <span style="font-size: 1.5em; color: #727272;">
                  <router-link :to="{name: 'cart'}">
                    <i class="fas fa-user mr-4"></i>
                  </router-link>
                </span>

              </div>


              <div class="nav-item ">
                <span  style="font-size: 1.5em; color: #727272;">
                  <router-link :to="{name: 'cart'}">
                    <i class="fas fa-shopping-cart mr-4"></i>
                  </router-link>
                </span>
                  
              </div>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import EventBus from '@/utils/EventBus'
export default {
  name: 'Nav',
  computed: {
    ...mapGetters(['categories', 'getTotalItems'])
  },
  data() {
    return {
      showCart: false
    }
  },
  methods: {
    ...mapActions(['getCategories']),
    handleCategory(item) {
      let path = '/c/' + item.name.toLowerCase()
      if (this.$route.params.ref ) {
        this.$router.push({path})
      }
      if (this.$route.params.cat === item.name.toLowerCase()) {
        return
      }
      this.$router.push({path })
      EventBus.$emit('refresh' )
    }
  },
  created() {
    this.getCategories()
  },
}
</script>

<style lang="scss" scoped>
img{
  width: 150px;
}
.nav-link{
  margin: 0 1rem;
  @media screen and (max-width: 600px) {
    margin: 0;
  }
}
.user-actions{
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
  }

}

</style>