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
                  <router-link :to="{path: '/c/' + $route.params.cat}">
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
              <form>
                <!-- COLOR -->
                <div class="row" >
                  <div class="col-12 detail-option mb-3" v-if="!product.accesory">
                    <h6 class="detail-option-heading">Color<span>*</span></h6>
                    <ul class="list-inline mb-0 colours-wrapper">
                      <li class="list-inline-item" v-for="(item, i) in getColor" :key="i">
                        <label :for="item.ref" :class="{'active': newOrderItem.refNumber === item.ref}" class="btn btn-sm btn-outline-secondary detail-option-btn-label" >{{item.color}}
                          <input :id="item.ref" v-model="newOrderItem.refNumber" type="radio" name="size" :value="item.ref" required class="input-invisible">
                        </label>
                      </li>
                    </ul>
                  </div>
                  <!-- TALLA -->
                  <div class="col-sm-6 col-lg-12 detail-option mb-3" v-if="!this.product.accesory">
                    <h6 class="detail-option-heading">Talla <span>*</span></h6>
                      <ul class="list-inline mb-0 colours-wrapper">
                        <li class="list-inline-item" v-for="(item, i) in getSizes" :key="i">
                          <label :class="{'active': newOrderItem.size === item}" :for="item" class="btn btn-sm btn-outline-secondary detail-option-btn-label">{{item}}
                            <input :id="item" v-model="newOrderItem.size" type="radio" name="size" :value="item" required class="input-invisible">
                          </label>
                        </li>
                      </ul>
                    </div>
                  
                  <div class="col-12 col-lg-6 detail-option mb-5">
                    <label class="detail-option-heading font-weight-bold">Cantidad
                      <span>*</span>
                    </label>
                    <input v-model="newOrderItem.quantity" name="cantidad" type="number" class="form-control detail-quantity">
                  </div>
                </div>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <button @click.prevent="addItem" class="btn btn-dark btn-lg mb-1"> <i class="fa fa-shopping-cart mr-2"></i>Añadir al carrito</button>
                  </li>
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
import {mapActions} from 'vuex'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      newOrderItem: {
        referenceNumberCommon: '',
        refNumber: '',
        size: '',
        price: '',
        quantity: 1
      }
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
    },
    getColor () {
      if (this.product.accesory) return
      let colors = []
      if (this.product.stock === undefined) return
      this.product.stock.forEach(item => {
        colors.push({
          ref: item.ref,
          color: item.color
        })
      })
      return colors
    },
    getSizes () {
      if (this.product.accesory) return
      if (this.product.stock === undefined) return
      let sizes = []
      this.product.stock.forEach(element => {
        element.quantity.forEach(size => {
          if (!size.units <= 0 && !sizes.includes(size.size)){
            sizes.push(size.size)
          }
        })
      })
      return sizes
    }
  },
  watch: {
   'newOrderItem.quantity' (value) {
      if (value <= 0) {
        this.newOrderItem.quantity = 1
      }
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    async getProduct() {
      let url = process.env.VUE_APP_URL  + '/product/' + this.$route.params.ref
      let response = await axios.get(url)
      this.product = response.data.productDB[0]
    },
    addItem () {
      this.newOrderItem.referenceNumberCommon = this.product.referenceNumberCommon
      this.newOrderItem.price = this.product.salePrice * this.newOrderItem.quantity
      this.addToCart(this.newOrderItem)
      // this.newOrderItem.referenceNumberCommon = ''
      // this.newOrderItem.quantity = 1
      // this.newOrderItem.size = ''
      // this.newOrderItem.refNumber = ''
    },
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
}
</style>