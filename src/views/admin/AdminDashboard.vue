<template lang="pug">
  section.admin-panel
    .admin-panel__panel
      h1.admin-panel__title Panel de aministración Macalola
      .admin-panel__form
        b-form
          b-form-group
            b-form-input(v-model="formFields.email" type="email" placeholder="Correo electrónico")


      
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
  }
}
</script>

<style lang="scss" scoepd>
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
    &__title{
      text-align: center;
    }
  }
</style>