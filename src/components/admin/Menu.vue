<template lang="pug">
  section.sidebar
    //- div aqui va el logo
    div.sidebar__menu
      ul
        li
          i(class="fas fa-home")
          router-link(:to="{name: 'adminhome'}") Home
        li
          i(class="fas fa-cart-arrow-down")
          router-link(:to="{name: ''}") Pedidos
        li
          i(class="fas fa-store-slash")
          router-link(:to="{name: ''}") Devoluciones
        li
          i(class="fas fa-boxes")
          router-link(:to="{name: ''}") Productos
        li
          i(class="fas fa-user")
          router-link(:to="{name: ''}") Usuarios
        li
          i(class="fas fa-sign-out-alt")
          router-link(:to="{name: ''}") Cerrar sesión
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style lang="scss" scoped>
a{
  color: $-white;
  list-style: none;
  font-size: 1.4rem;
  text-decoration: none;
}
li {
  list-style: none;
  margin-bottom: 2rem;
}
svg{
  transform: scale(1.5);
  color: white;
  margin-right: 2rem;
}
</style>