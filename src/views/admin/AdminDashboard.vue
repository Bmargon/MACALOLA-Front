<template lang="pug">
  section.admin-panel
    .admin-panel__panel
      h1.admin-panel__title Panel de aministración Macalola
      b-form.admin-panel__form(@submit.prevent="logIn")
        b-form-input(
          type="email"
          v-model="formFields.email"
          placeholder="Correo electrónico")
        b-form-input(
          v-model="formFields.password" 
          type="password" 
          placeholder="Contraseña")
        b-button(type="submit").admin-panel__button Acceder
  
</template>

<script>

export default {
  data () {
    return {
      formFields: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    logIn () {
      console.log('formulari enviado')
    }
  },
  created() {
  },
}
</script>

<style lang="scss" scoepd>
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
    &__title {
      text-align: center;
      margin-bottom: 3rem;
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
      background: #6675df;
      font-size: 12px;
      color: $-white;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
</style>