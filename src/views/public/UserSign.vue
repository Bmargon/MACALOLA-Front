<template>
  <section>
     <article class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><router-link :to="{name: 'home'}">Home</router-link></li>
          <li class="breadcrumb-item active">Area clientes    </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading mb-0">Area clientes</h1>
        </div>
      </div>
    </article>
    <!-- customer login-->
    <article>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Iniciar sesión</h6>
              </div>
              <div class="block-body">
                <p class="lead">¿Ya eres cliente?</p>
                <p class="text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <hr>
                <form >
                  <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <p class="text-danger" v-if="$v.signIn.email.$error">El correo electrónico no es valido</p>
                    <input :class="{'is-invalid': $v.signIn.email.$error}" v-model.lazy="$v.signIn.email.$model" id="email" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <p class="text-danger" v-if="$v.signIn.password.$error">La contraseña es obligatoria</p>
                    <input :class="{'is-invalid': $v.signIn.password.$error}" v-model.lazy="$v.signIn.password.$model" id="password" type="password" class="form-control">
                  </div>
                  <div class="form-group text-center">
                    <b-overlay  :show="loading"> 
                      <button :disabled="$v.signIn.$invalid" class="btn btn-outline-dark"><i class="fa fa-sign-in-alt mr-2"></i> Iniciar sesión</button>
                    </b-overlay>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Nuevo cliente</h6>
              </div>
              <div class="block-body"> 
                <p class="lead">¿Aún no eres cliente?</p>
                <p class="text-muted">With registration with us new world of fashion, fantastic discounts and much more opens to you! The whole process will not take you more than a minute!</p>
                <p class="text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p>
                <hr>
                <form>
                  <div class="form-group">
                    <label for="name" class="form-label">Nombre</label>
                    <p class="text-danger" v-if="$v.signUp.fullName.$error">El nombre es obligatorio</p>
                    <input :class="{'is-invalid': $v.signUp.fullName.$error}"  v-model.lazy="$v.signUp.fullName.$model" id="name" type="text" class="form-control">
                  </div>
   
                  <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <p class="text-danger" v-if="$v.signUp.email.$error">El correo electrónico es obligatorio</p>
                    <input :class="{'is-invalid': $v.signUp.email.$error}" v-model.lazy="$v.signUp.email.$model" id="email" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <p class="text-danger" v-if="$v.signUp.password.$error">La contraseña es obligatoria</p>
                    <input :class="{'is-invalid': $v.signUp.password.$error}" v-model.lazy="$v.signUp.password.$model" id="password" type="password" class="form-control">
                  </div>
                  <div class="ml-4 form-group custom-checkbox">
                    <input name="subscribe" id="subscribe" v-model.lazy="signUp.subscribe" type="checkbox" class="custom-control-input">
                    <label  for="subscribe" data-toggle="collapse" class="custom-control-label align-middle">Acepto recibir comunicador comerciales de Macalola</label>
                  </div>
                  <div class="ml-4 form-group custom-checkbox" >
                    <input v-model.lazy="$v.signUp.termsAndConditions.$model" name="termsAndConditions" id="termsAndConditions" type="checkbox" class="custom-control-input">
                    <label :class="{'is-invalid': $v.signUp.termsAndConditions.$model === false}" for="termsAndConditions" data-toggle="collapse" class="custom-control-label align-middle">Acepto los terminos y condiciones</label>
                  </div>
                  <div class="form-group text-center">
                    <b-overlay  :show="loading"> 
                      <button @click.prevent="signUpMethod" :disabled="$v.signUp.$invalid" class="btn btn-outline-dark"><i class="far fa-user mr-2"></i>Registrarse  </button>
                    </b-overlay> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>

</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      signIn: {
        email: '',
        password: ''
      },
      signUp: {
        fullName: '',
        email: '',
        password: '',
        termsAndConditions: false,
        subscribe: true
      }
    }
  },
  validations: {
    signIn: {
      email: { required, email },
      password: { required }
    },
    signUp: {
        fullName: { required },
        email: { required, email },
        password: { required },
        termsAndConditions: { required },
      }
  },
  methods: {
    signInMehtod() {

    },
    async signUpMethod () {
      try {
        this.loading = true
        let url = process.env.VUE_APP_URL + '/user'
        let response = await axios.post(url, this.signUp )
          this.$bvToast.toast('Usuario creado correctamente', {
          title: `Inicie sesión a continuación`,
          variant: 'success',
          solid: true
        })
        console.log(response);
        this.signIn.email = this.signUp.email
      } catch (error) {
         this.$bvToast.toast('Error al crear usuario', {
          title: `Revise los campos`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.loading = false
        this.signUp.email = ''
        this.signUp.fullName = ''
        this.signUp.password = ''
        this.signUp.termsAndConditions =  false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  
</style>