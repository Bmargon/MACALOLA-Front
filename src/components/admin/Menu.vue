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
          router-link(:to="{name: 'orders'}") Pedidos
        li
          i(class="fas fa-store-slash")
          router-link(:to="{name: 'returns'}") Devoluciones
        li
          i(class="fas fa-boxes")
          router-link(:to="{name: 'products'}") Productos
        li
          i(class="fas fa-user")
          router-link(:to="{name: 'users'}") Usuarios

</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style lang="scss" scoped>
a{
  color: $-black;
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
  color: $-black;
  margin-right: 2rem;
}
</style>