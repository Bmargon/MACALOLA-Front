<template lang="pug">
  section.sidebar
    div.sidebar__img
      img(src="https://res.cloudinary.com/macalola/image/upload/v1588232928/logo/logo_o2hsci.png", alt="alt")
    div.sidebar__menu
      nav
        ul
          li(:class="[currentPath.includes('home') ? 'router-link-active' : '']")
            i(class="fas fa-home")
            router-link( :to="{name: 'adminhome'}") Home
          li(:class="[currentPath.includes('orders') ? 'router-link-active' : '']")
            i(class="fas fa-cart-arrow-down")
            router-link(:to="{name: 'orders'}") Pedidos
          li(:class="[currentPath.includes('returns') ? 'router-link-active' : '']")
            i(class="fas fa-store-slash")
            router-link(:to="{name: 'returns'}") Devoluciones
          li(:class="[currentPath.includes('products') ? 'router-link-active' : '']")
            i(class="fas fa-boxes")
            router-link(:to="{name: 'products'}") Productos
          li(:class="[currentPath.includes('users') ? 'router-link-active' : '']")
            i(class="fas fa-user")
            router-link(:to="{name: 'users'}") Usuarios

</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeClass: 'router-link-active'
    }
  },
  computed: {
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  &__img {
    text-align: center;
  }
}
.router-link-active {
  background-color: $-color-admin;
  color: $-white; 
  font-weight: bold;
  a {
    color: $-white;
  }
  svg{
    transform: scale(1.5);
    color: $-white;
    margin-right: 2rem;
  }
}
img {
  width: 200px;
  margin-bottom: 2rem;
}
a{
  color: $-black;
  list-style: none;
  font-size: 1.4rem;
  text-decoration: none;
}
ul {
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  padding: 1rem 0 1rem 1.5rem;
  background-color: $-white;
  color: $-black; 
  font-weight: bold;
  a {
    color: $-black;
  }
  svg{
    transform: scale(1.5);
    color: $-black;
    margin-right: 2rem;
  }
}
</style>