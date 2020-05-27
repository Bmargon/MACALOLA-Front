<template>
  <section class="product product-details">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 py-3 order-2 order-lg-1">
            <div data-slider-id="1" class="owl-carousel owl-theme owl-dots-modern detail-full">
              <div class="product__img detail-full-item" :style="{'background': getProductImg, ' background-repeat': 'no-repeat'}" >     </div>
            </div>
          </div>
          <div class="d-flex align-items-center col-lg-6 col-xl-5 pl-lg-5 mb-5 order-1 order-lg-2">
            <div>
              <ul class="breadcrumb justify-content-start">
                <li class="breadcrumb-item">
                  <router-link :to="{path: '/'}">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link :to="{path: '/' + $route.params.cat}">
                    {{getCategory}}
                  </router-link>
                </li>
                <li class="breadcrumb-item active">{{product.name}}</li>
              </ul>
              <h1 class="mb-4"> {{product.name}} </h1>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                <ul class="list-inline mb-2 mb-sm-0">
                  <li class="list-inline-item h4 font-weight-light mb-0"> {{product.salePrice}} €</li>
                  <li class="list-inline-item text-muted font-weight-light" v-if="product.promotionOn"> 
                    <del> {{priceWithOutDiscount}}</del>
                  </li>
                </ul>

              </div>
              <p class="mb-4 text-muted"> {{product.description}}</p>
              <form action="#">
                <div class="row">
                  <div class="col-sm-6 col-lg-12 detail-option mb-3">
                    <h6 class="detail-option-heading">Talla <span>*</span></h6>
                    <div  v-for="(quantity, i) in product.stock" :key="i"></div>
                    <label for="size_0" class="btn btn-sm btn-outline-secondary detail-option-btn-label">
                       
                      Small
                      <input type="radio" name="size" value="value_0" id="size_0" required class="input-invisible">
                    </label>
                  </div>
                  
                  <div class="col-12 detail-option mb-3" v-if="product.accesory">
                    <h6 class="detail-option-heading">Color<span>*</span></h6>
                    <ul class="list-inline mb-0 colours-wrapper">
                      <li class="list-inline-item">
                        <label for="colour_Blue" style="background-color: #668cb9" class="btn-colour"> </label>
                        <input type="radio" name="colour" value="value_Blue" id="colour_Blue" required class="input-invisible">
                      </li>
                      <li class="list-inline-item">
                        <label for="colour_White" style="background-color: #fff" class="btn-colour"> </label>
                        <input type="radio" name="colour" value="value_White" id="colour_White" required class="input-invisible">
                      </li>
                      <li class="list-inline-item">
                        <label for="colour_Violet" style="background-color: #8b6ea4" class="btn-colour"> </label>
                        <input type="radio" name="colour" value="value_Violet" id="colour_Violet" required class="input-invisible">
                      </li>
                      <li class="list-inline-item">
                        <label for="colour_Red" style="background-color: #dd6265" class="btn-colour"> </label>
                        <input type="radio" name="colour" value="value_Red" id="colour_Red" required class="input-invisible">
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 col-lg-6 detail-option mb-5">
                    <label class="detail-option-heading font-weight-bold">Items <span>(required)</span></label>
                    <input name="items" type="number" value="1" class="form-control detail-quantity">
                  </div>
                </div>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <button type="submit" class="btn btn-dark btn-lg mb-1"> <i class="fa fa-shopping-cart mr-2"></i>Add to Cart</button>
                  </li>
                  <li class="list-inline-item"><a href="#" class="btn btn-outline-secondary mb-1"> <i class="far fa-heart mr-2"></i>Add to wishlist</a></li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {}
    }
  },
  computed: {
    priceWithOutDiscount () {
      return (this.product.salePrice / this.product.percentage * 100)
    },
    getProductImg () {
      return `url(${this.product.img})`
    },
    getCategory () {
      let route = this.$route.params.cat
      return route.charAt(0).toUpperCase() + route.slice(1);
    }
  },
  methods: {
    async getProduct() {
      let url = process.env.VUE_APP_URL  + '/product/' + this.$route.params.ref
      let response = await axios.get(url)
      this.product = response.data.productDB[0]
      console.log(response);
    }
  },
  created() {
    this.getProduct()
  }
}
</script>
<style lang="scss" scoped>
.detail-full-item {
    background: center center;
     background-size: cover;
    ;
  
}
</style>