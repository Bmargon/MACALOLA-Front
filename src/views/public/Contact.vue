<template >
  <div>
    <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item">
            <router-link :to="{name: 'home'}">Home</router-link>
          </li>
          <li class="breadcrumb-item active">Contacta con nosotros        </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Contactar</h1>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Are you curious about something?  As am hastily invited settled at limited civilly fortune me. Really spring in extent an by. Judge but built party world. Of so am he remember although required. Bachelor unpacked be advanced at. Confined in declared marianne is vicinity.</p></div>
          </div>
        </div>
      </div>
    </section>
     <section style="background: #fafafa;" class="py-6">   
      <div class="container">       
        <div class="row">
          <div class="col-md-4 text-center text-md-left">
            <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
              <use xlink:href="#navigation-map-1"> </use>
            </svg>
            <h4 class="ff-base">Address</h4>
            <p class="text-muted">13/25 New Avenue<br>New Heaven, 45Y 73J<br>England, <strong>Great Britain</strong></p>
          </div>
          <div class="col-md-4 text-center text-md-left">
            <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
              <use xlink:href="#audio-call-1"> </use>
            </svg>
            <h4 class="ff-base">Call center</h4>
            <p class="text-muted">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="text-muted"><strong>+33 555 444 333</strong></p>
          </div>
          <div class="col-md-4 text-center text-md-left">
            <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
              <use xlink:href="#mail-1"> </use>
            </svg>
            <h4 class="ff-base">Electronic support</h4>
            <p class="text-muted">Please feel free to write an email to us or to use our electronic ticketing system.</p>
            <ul class="list-unstyled text-muted">
              <li>info@sell.com</li>
              <li>support@sell.com</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
     <section class="py-6">
      <div class="container">
        <header class="mb-5">
          <h2 class="text-uppercase h5">Formulario de contacto</h2>
        </header>
        <div class="row">
          <div class="col-md-7 mb-5 mb-md-0">
            <form class="form">
              <div class="controls">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="name" class="form-label">Nombre</label>
                      <input required v-model="form.name" type="text" name="name"  class="form-control">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="surname" class="form-label">Apellido *</label>
                      <input required v-model="form.surname" type="text" name="surname"   class="form-control">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Correo electrónico</label>
                  <input v-model="form.email" type="email" name="email"  required class="form-control">
                </div>
                <div class="form-group">
                  <label for="message" class="form-label">Mesaje que quieres que recibamos</label>
                  <textarea v-model="form.message" rows="4" name="message"  required="required" class="form-control"></textarea>
                </div>
                <button @click.prevent="sendRequest" class="btn btn-outline-dark">Enviar</button>
              </div>
            </form>
          </div>
          <div class="col-md-5">
            <p class="text-muted">Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. </p>
            <p class="text-muted">Able an hope of body. Any nay shyness article matters own removal nothing his forming. Gay own additions education satisfied the perpetual. If he cause manor happy. Without farther she exposed saw man led. Along on happy could cease green oh. </p>
            <div class="social">
              <ul class="list-inline">
                <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-facebook"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-pinterest"></i></a></li>
                <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-vimeo"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    async sendRequest () {
      try {
        let response = await axios.post(`${process.env.VUE_APP_URL}/contact`, this.form)
         this.$bvToast.toast('Solicitud enviada correctamente', {
          title: `Hecho!`,
          variant: 'success',
          solid: true
        })
      } catch (error) {
        this.$bvToast.toast('No se pudo  mandar la solicitud', {
          title: `Error`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.form.name = ''
        this.form.email = ''
        this.form.surname = ''
        this.form.message = ''
      }
    }
  },
}
</script>