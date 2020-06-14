<template>
  <article>
    <div class="col-xl-4 col-sm-6">
      <div class="product mx-4">
        <div class="product-image">
          <div v-if="content.promotionOn && !isOffertsURL" class="ribbon ribbon-primary">Oferta</div>
          <div class="ribbon ribbon-info" v-if="content.accesory">Accesorio</div>
          <div class="ribbon ribbon-danger" v-if="content.totalStock === 0">Sold out</div>
          <img :src="content.img" alt="product" class="img"/>
          <div class="product-hover-overlay">
            <router-link :to="getRoute"></router-link>
            <div class="product-hover-overlay-buttons">
              <router-link class="btn btn-dark btn-buy" :to="getRoute">
                <i class="fa-search fa"></i>
                <span class="btn-buy-label ml-2">Ver</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="py-4">
          <h3 class="h6 text-uppercase mb-1">
            <router-link  class="text-dark" :to="getRoute">
              {{content.name}}  
            </router-link>
          </h3>
          <span class="text-muted">{{content.salePrice}}€</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'ProductCategory',
    props: ['content'],
    computed: {
      getRoute () {
        return {
          path: '/i/' + this.$route.params.cat + '/' + this.content.referenceNumberCommon
        }
      },
      isOffertsURL () {
        return this.$route.params.cat === 'ofertas'
      }
    },
    mounted() {
      window.scrollTo(0,0);
    }
  }
</script>
<style lang="scss" scoped>
  .img{
    width: 199px;
    height: 330px;
    object-fit: contain;
  }
  .product-image{
    width: 199px;
  }
  .product-hover-overlay {
    width: 199px;
    height: 330px;
  }
</style>