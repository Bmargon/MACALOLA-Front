<template>
  <section>
    <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><router-link :to="{name: 'home'}">Home</router-link></li>
          <li class="breadcrumb-item active">Carrito de la compra       </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Carrito de la compra</h1>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">{{getTotalItems === 0 ? 'Aun no tienes productos en la cesta' : 'Tienes ' + getTotalItems + ' productos en el carrito'}}</p></div>
          </div>
        </div>
      </div>
    <div class="container" v-if="getTotalItems">
        <div class="row mb-5"> 
          <div class="col-lg-8">
            <div class="cart">
              <div class="cart-wrapper">
                <div class="cart-header text-center">
                  <div class="row">
                    <div class="col-5">Producto</div>
                    <div class="col-2">Precio</div>
                    <div class="col-2">Cantidad</div>
                    <div class="col-2">Total</div>
                    <div class="col-1"></div>
                  </div>
                </div>
                <div class="cart-body">
                  <!-- Product-->
                  <div class="cart-item" v-for="(item, i) in getCart" :key="i">
                    <div class="row d-flex align-items-center text-center">
                      <div class="col-5">
                        <div class="d-flex align-items-center"><a href="detail.html">
                          <img :src="item.img" alt="..." class="cart-item-img"></a>
                          <div class="cart-title text-left">
                            <a href="detail.html" class="text-uppercase text-dark">
                              <strong>{{item.name}}</strong></a><br><span class="text-muted text-sm">Size: Large</span><br><span class="text-muted text-sm">Colour: Green</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-2">{{item.price}} €</div>
                      <div class="col-2">
                        <div class="d-flex align-items-center">
                          <div @click="restOneItem(i, item)" class="btn btn-items btn-items-decrease">-</div>
                          <input type="text" :value="item.quantity" class="form-control text-center input-items">
                          <div @click="addOneItem(i,  item)" class="btn btn-items btn-items-increase">+</div>
                        </div>
                      </div>
                      <div class="col-2 text-center">{{item.quantity * item.price}} €</div>
                      <div@click="removeItem(i)" class="col-1 text-center"> 
                        <i class="fa fa-times"></i>
                      </div>
                    </div>
                  </div>
              
                </div>
              </div>
            </div>
            <div class="my-5 d-flex justify-content-between flex-column flex-lg-row">
              <router-link :to="{name: 'home'}" class="btn btn-link text-muted">
                <i class="fa fa-chevron-left">
                  </i> Seguir comprando
                </router-link >
                  <router-link :to="{name: 'home'}" class="btn btn-dark">Proceed to checkout 
                <i class="fa fa-chevron-right"></i>                                                     
                </router-link >
              </div>
          </div>
          <div class="col-lg-4" v-if="getTotalItems">
            <div class="block mb-5">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Resumen del pedido</h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p class="text-sm">Gastos de envio gratuitos a partir de pedidos de {{getGlobalConfig.moneyBack}} €</p>
                <ul class="order-summary mb-0 list-unstyled">
                  <li class="order-summary-item"><span>Resumen de compra </span><span>{{getTotalAmount}} €</span></li>
                  <li class="order-summary-item" v-if="!freeShipping"><span>Gastos de envio</span><span>{{getGlobalConfig.sendPrice}} €</span></li>
                  <li class="order-summary-item" v-if="freeShipping"><span>Gastos de envio</span><span><del>{{getGlobalConfig.sendPrice}}</del> €</span></li>
                  <li class="order-summary-item border-0"><span>Total</span><strong class="order-summary-total">{{ totalAmountWithSend }} €</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {
    ...mapGetters(['getTotalItems', 'getCart', 'getTotalAmount', 'getGlobalConfig']),
    freeShipping () {
      return this.getTotalAmount >= this.getGlobalConfig.moneyBack
    },
    totalAmountWithSend () {
      if (this.getTotalAmount >= this.getGlobalConfig.moneyBack) {
        return this.getTotalAmount
      } else {
        return this.getTotalAmount + parseInt(this.getGlobalConfig.sendPrice)
      }
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'refreshCart']),
    removeItem (i) {
      this.removeFromCart(i)
    },
    restOneItem (i, item) {
      if (this.getCart[i].quantity === 1) return
      this.getCart[i].quantity -= 1
      this.refreshCart({index: i, item})
    },
    addOneItem (i, item) {
      if (this.getCart[i].quantity === 1) return
      this.getCart[i].quantity += 1
      this.refreshCart({index: i, item})
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>