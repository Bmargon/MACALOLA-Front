<template lang="pug">
  section.products
    h1 {{title}} 
    hr
    b-nav(tabs)
      b-nav-item(@click="setForm('Productos')") Productos
      b-nav-item(@click="setForm('Crear Producto')") Crear Producto
      b-nav-item(@click="setForm('Crear Categoria')") Crear Categoria
    
    .products__form
      product-list(v-if="title === 'Productos'")
      item-form(v-if="title === 'Crear Producto'")
      category-form(v-if="title === 'Crear Categoria'")
</template>
<script>
import ItemForm from '@/components/admin/products/ItemForm'
import CategoryForm from '@/components/admin/products/CategoryForm'
import ProductList from '@/components/admin/products/ProductList'
export default {
  components: {
    ItemForm,
    CategoryForm,
    ProductList
  },
  data () {
    return {
      title: 'Productos'
    }
  },
  methods: {
    setForm(form) {
      switch(form) {
        case 'Productos':
          this.title = form
          break
        case 'Crear Producto':
          this.title = form
          break
        case 'Crear Categoria':
          this.title = form
          break
        default:
          this.title = 'Productos'
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