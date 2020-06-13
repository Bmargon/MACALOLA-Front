<template>
  <div>
      <footer class="main-footer">
      <!-- Services block-->
      <div class="bg-gray-100 text-dark-700 py-6">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 service-column">
              <span class="mr-3" style="font-size: 2em; color: #727272;">
                <i class="fas fa-shipping-fast"></i>
              </span>       
              <div class="service-text">
                <h6 class="text-uppercase">Envío gratis</h6>
                <p class="text-muted font-weight-light text-sm mb-0">a partir de {{getGlobalConfig.moneyBack}} €</p>
              </div>
            </div>
            <div class="col-lg-4 service-column">
              <span class="mr-3" style="font-size: 1.9em; color: #727272;">
                <i class="fas fa-money-check-alt"></i>
              </span>
              <div class="service-text">
                <h6 class="text-uppercase">Garantía de devolución</h6>
                <p class="text-muted font-weight-light text-sm mb-0">Hasta 15 días para devolver los productos</p>
              </div>
            </div>
            <div class="col-lg-4 service-column">
              <span class="mr-3" style="font-size: 2.2em; color: #727272;">
                <i class="fas fa-concierge-bell"></i>
              </span>
              <div class="service-text">
                <h6 class="text-uppercase">{{getGlobalConfig.emailOnDisplay}}</h6>
                <p class="text-muted font-weight-light text-sm mb-0">24/7 Atención al cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Main block - menus, subscribe form-->
      <div class="py-6 bg-gray-300 text-muted"> 
        <div class="container">
          <div class="row">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="font-weight-bold text-uppercase text-lg text-dark mb-3">Macalola<span class="text-primary">.</span></div>
              <ul class="list-inline">
                <li class="list-inline-item"><a href="#" target="_blank" title="twitter" class="text-muted text-hover-primary"><i class="fab fa-twitter"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank" title="facebook" class="text-muted text-hover-primary"><i class="fab fa-facebook"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank" title="instagram" class="text-muted text-hover-primary"><i class="fab fa-instagram"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank" title="pinterest" class="text-muted text-hover-primary"><i class="fab fa-pinterest"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank" title="vimeo" class="text-muted text-hover-primary"><i class="fab fa-vimeo"></i></a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 class="text-uppercase text-dark mb-3">Shop</h6>
              <ul class="list-unstyled">
                <li> <a href="#" class="text-muted">For Women</a></li>
                <li> <a href="#" class="text-muted">For Men</a></li>
                <li> <a href="#" class="text-muted">Stores</a></li>
                <li> <a href="#" class="text-muted">Our Blog</a></li>
                <li> <a href="#" class="text-muted">Shop</a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 class="text-uppercase text-dark mb-3">Company</h6>
              <ul class="list-unstyled">
                <li> <a href="#" class="text-muted">Login                    </a></li>
                <li> <a href="#" class="text-muted">Register                    </a></li>
                <li> <a href="#" class="text-muted">Wishlist                    </a></li>
                <li> <a href="#" class="text-muted">Our Products                    </a></li>
                <li> <a href="#" class="text-muted">Checkouts                    </a></li>
              </ul>
            </div>
            <div class="col-lg-4">
              <h6 class="text-uppercase text-dark mb-3">Daily Offers & Discounts</h6>
              <p class="mb-3"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
              <form action="#" id="newsletter-form">
                <div class="input-group mb-3">
                  <input  v-model="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" placeholder="Correo electrónico" aria-label="Your Email Address" class="form-control bg-transparent border-secondary border-right-0">
                  <div class="input-group-append">
                      <button @click.prevent="addToSubsList" class="btn btn-outline-secondary border-left-0"> 
                        <b-overlay :show="show" rounded="sm">
                          <i class="fa fa-paper-plane text-lg text-dark"></i>
                        </b-overlay>
                      </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Copyright section of the footer-->
      <div class="py-4 font-weight-light bg-gray-800 text-gray-300">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-left">
              <p class="mb-md-0">&copy; Macalola {{year}}.  Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- /Footer end-->
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      show: false
    }
  },
  computed: {
    ...mapGetters(['getGlobalConfig']),
    year () {
      return new Date().getFullYear()
    }
  },
  methods: {
    async addToSubsList () {
      try {
        this.show = true
        await axios.post(`${process.env.VUE_APP_URL}/suscription`, {'email': this.email})
         this.$bvToast.toast('Desde ahora recibiras en tu email nuestras ofertas y promociones', {
          title: `Hecho!`,
          variant: 'success',
          solid: true
        })
      } catch (error) {
        this.$bvToast.toast('No se puedo añadir a la lista de suscripción', {
          title: `Error`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.show = false
        this.email = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>