<template lang="pug">
  section.sidebar
    //- div aqui va el logo
    div.sidebar__menu
      ul
        li
          i(class="fab fa-medium")
          router-link(:to="{name: ''}") Home
        li
          i(class="fab fa-medium")
          router-link(:to="{name: ''}") Pedidos
        li
          i(class="fab fa-medium")
          router-link(:to="{name: ''}") Devoluciones
        li
          i(class="fab fa-medium")
          router-link(:to="{name: ''}") Usuarios
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
  margin-bottom: 1.5rem;
}
svg{
  color: white;
  margin-right: 1rem;
}
</style>