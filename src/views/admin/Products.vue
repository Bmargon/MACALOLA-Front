<template lang="pug">
  section.products
    h1 {{title}} 
    hr
    b-nav(tabs)
      b-nav-item(@click="setForm('Producto')") Producto
      b-nav-item(@click="setForm('Categoria')") Categoria
    
    .products__form
      item-form(v-if="isItemForm")
      category-form(v-else)
</template>
<script>
import ItemForm from '@/components/admin/products/ItemForm'
import CategoryForm from '@/components/admin/products/CategoryForm'
export default {
  components: {
    ItemForm,
    CategoryForm
  },
  data () {
    return {
      isItemForm: true,
      title: 'Producto'
    }
  },
  methods: {
    setForm (form) {
      if (form === 'Producto') {
        this.isItemForm = true
        this.title = form
      } else {
        this.title = form
        this.isItemForm = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.products__form{
  padding: 2rem;
}
</style>