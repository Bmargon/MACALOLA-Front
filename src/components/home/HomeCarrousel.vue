<template>
  <article>
    <b-carousel
    class="carousel"
    :interval="isMobile ? 0 : 4000"
    :controls="isMobile ? false : true"
    :indicators="isMobile ? false : true"
    img-width="100%"
    background="#ababab"
    img-height="280"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
    v-model="slide"
    >
     <b-carousel-slide
        v-for="(item, i) in parseCarouser"
        :key="i"
        :img-src="item.img"
      >     
      <div class="item home-full-item">
        <div class="container-fluid h-100 py-5">
         <h5 class="text-uppercase text-white font-weight-light mb-4 letter-spacing-5"> {{item.subtitle}}</h5>
          <h1 class="mb-5 display-2 font-weight-bold text-serif">{{item.title}}</h1>
          <p> 
            <router-link class="btn btn-light" :to="{path: '/c/' + item.button}">Ver ahora</router-link>  
          </p>
        </div>
      </div>
      </b-carousel-slide>

    </b-carousel>
  </article>


  
</template>

<script>
import {mapGetters} from 'vuex'
  export default{
    name: 'HomeCarrousel',
    data() {
      return {
        slide: 0,
        sliding: null,
      }
    },
    computed: {
      ...mapGetters(['getGlobalConfig']),
      isMobile () {
        return ( window.innerWidth <= 800 ) || ( window.innerHeight <= 600 )
      },
      parseCarouser () {
        if(this.getGlobalConfig !== undefined) {
          try {
            return JSON.parse(this.getGlobalConfig.carousel)
          } catch (error) {
            console.log(error)
          }
        } else return []
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
  }
</script>
<style lang="scss">
.carousel-inner{
  height: 700px;
  @media screen and (max-width: 600px) {
    height: 230px;
  }
} 
.carousel-caption{
  top: 20%;
  @media screen and (max-width: 600px) {
    
  top: -45px;
  }
}
</style>