<template>
  <div>
    <nav aria-label="page navigation" class="d-flex justify-content-center mb-5 mt-3">
      <ul class="pagination">
        <li class="page-item">
          <button @click="back" aria-label="Previous" class="page-link">
            <span aria-hidden="true">Anterior</span>
          </button>
        </li>
        <li v-for="(item, i) in getPages" :key="i" class="page-item" :class="{'active': i === currentPage }">
          <button @click="handlePage(i)" class="page-link">{{i + 1}}</button>
        </li>

        <li class="page-item">
          <button @click="next" aria-label="Next" class="page-link">
            <span aria-hidden="true">Siguiente</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    name: 'Pagination',
    props: ['totalProducts', 'totalProductsPerPage'],
    data() {
      return {
        currentPage: 0,
      }
    },

    watch: {
      'currentPage' (value) {
        if (value <= 0 ) this.currentPage = 0
        if (value >= this.getPages.length) this.currentPage = this.getPages.length - 1
        this.updateProductsOnPageChange()
        window.scrollTo(0,0);
      },

    },
    computed: {
      getPages() {
        let totalPages = this.totalProducts / this.totalProductsPerPage
        return new Array(Math.ceil(totalPages ))
      },
    },
    methods: {

      back () {
        this.currentPage -= 1
      },
      next() {
        this.currentPage += 1
      },
      updateProductsOnPageChange () {
        this.$emit('updateProductsOnPageChange', this.currentPage)
      },
      handlePage(i) {
        this.currentPage = i
      }
    }
  }
</script>