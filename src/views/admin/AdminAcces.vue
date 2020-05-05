<template lang="pug">
  section.admin-panel
    router-view
    .admin-panel__panel
      div.admin-panel__img.mb-3
        img(src="https://res.cloudinary.com/macalola/image/upload/v1588232928/logo/logo_o2hsci.png", alt="alt")
      h1.admin-panel__title Panel de aministración
      b-form.admin-panel__form(@submit.prevent="logIn")
        b-form-input(
          v-model.lazy="$v.formFields.email.$model"
          type="email"
          placeholder="Correo electrónico")
        p(v-if="$v.formFields.email.$error") El email no es valido
        b-form-input(
          v-model="$v.formFields.password.$model" 
          type="password" 
          placeholder="Contraseña")
        p(v-if="$v.formFields.password.$error") La contraseña es obligatoria
        b-button(type="submit").admin-panel__button Acceder
</template>

<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      formFields: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    formFields: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    async logIn () {
      if (this.$v.$invalid) {
        this.$bvToast.toast('El formulario no es correcto', {
          title: ``,
          variant: 'danger',
          solid: true
        })
      }
      try {
        const formdata = new FormData()
        formdata.append("email", this.formFields.email)
        formdata.append("password", this.formFields.password)
        let userResponse = await axios.post(`${process.env.VUE_APP_URL}/login-admin`, this.formFields)
        sessionStorage.setItem('adminToken', userResponse.data.token)
        this.$router.push({name: 'adminhome'})
        console.log(userResponse);
      } catch (error) {
        this.$bvToast.toast('Usuario incorrecto', {
          title: ``,
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: $-error;
}
.form-control {
  width: 100%;
  height: 80px;
  position: relative;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  margin-bottom: 10px;
}
  .admin-panel{
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: flex-end;
    background-image: url('https://res.cloudinary.com/macalola/image/upload/v1587810316/front-assets/admin-wallpaper_ad65sq.jpg');
    &__panel{
      display: flex;
      flex-direction: column;
      width: 560px;
      min-height: 100vh;
      display: block;
      background-color: $-white-2;
      padding: 173px 55px 55px 55px;
    }
    &__img {
    display: flex;
    justify-content: center;
      img {
        width: 350px;
      }
    }
    &__title {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2rem;
    }
    &__form{
      input:last-of-type {
        margin-bottom: 2rem;
      }
    }
    &__button{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 50px;
      border-radius: 10px;
      background: $-color-admin;
      font-size: 12px;
      color: $-white;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
</style>