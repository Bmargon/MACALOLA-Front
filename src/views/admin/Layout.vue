<template lang="pug">
  
  section
    article.topbar
      b-badge.mr-3(pill variant="success") Administrador
      div.mr-3
        span.mr-2.topbar__out Cerrar sesión
        i.__icon(class="fas fa-sign-out-alt")
    article.admin
      Menu.admin__menu
        span hola
      router-view.admin__content
</template>

<script>
import Menu from '@/components/admin/Menu'
export default {
  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>

.topbar{
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0%;
  height: 3rem;
  background-color: $-color-admin;
  &__out {
    color: white;
  }
  svg {
    color: white;
  }
}
.admin{
  width: 100%;
  height: 100%;
  display: flex;
  
  &__menu{
    left: 0px;
    box-shadow: 0 10px 30px rgba(59, 43, 91, 0.1); 
    padding-top: 2rem;
    width: 300px;
    min-height: 100%;
  }
  &__content {
    padding: 2rem;
    width: 100%;
  }
}
</style>