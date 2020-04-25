<template lang="pug">
  section.admin
    Menu.admin__menu
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
.admin{
  width: 100%;
  height: 100%;
  display: flex;
  
  &__menu{
    padding-top: 2rem;
    width: 300px;
    height: 100vh;
    background-color: $-color-admin;
  }
}
</style>