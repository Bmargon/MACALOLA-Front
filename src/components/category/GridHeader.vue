<template>
  <article class="container header-category">
    <header class="product-grid-header">
      <div class="mr-3 mb-3"> 
        Mostrando <strong v-if="perPage < totalProducts">{{perPage}} </strong> <span v-if="perPage < totalProducts">de</span> <strong>{{totalProducts}} </strong>productos
      </div>
      <div class="mr-3 mb-3">
        <span class="mr-2">Mostrar</span>
        <button @click="handleTotal(item)" v-for="(item, i) in totalPerPage" :key="i" :class="{'active': item === perPage}" class="page-link product-grid-header-show ">{{item}}</button>
      </div>
    </header>
  </article>
</template>

<script>
  export default {
    name: 'GridHeaderCategory',
    props: ['totalProducts'],
    data() {
      return {
        totalPerPage: [5, 10, 20, 40],
        perPage: 20
      }
    },
    methods: {
      handleTotal(total) {
        this.perPage = total
        this.$emit('totalPerPage', total)
      }
    },
  }
</script>
