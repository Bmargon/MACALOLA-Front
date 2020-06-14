<template>
  <div>
    <nav aria-label="page navigation" class="d-flex justify-content-center mb-5 mt-3">
      <ul class="pagination">
        <li class="page-item">
          <button @click="back" aria-label="Previous" class="page-link">
            <span aria-hidden="true">Anterior</span>
          </button>
        </li>
        <li v-for="(item, i) in pageArray" :key="i" class="page-item" :class="{'active': i === currentPage }">
          <button @click="handlePage(i)" class="page-link">{{item + 1}}</button>
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
        currentPage: 1,
        pageArray: []
      }
    },

    watch: {
      'currentPage' (value) {
        if (value === -1) this.currentPage = 0
        if (value === this.pageArray.length) this.currentPage = this.pageArray.length - 1
        this.updateProductsOnPageChange()
      },

    },
    methods: {
      getPages() {
        let pageArray = []
        let totalPages = this.totalProducts / this.totalProductsPerPage - 1 
        for (let i = 0; i < totalPages; i++) {
          console.log('hola',i)
          pageArray.push(i)
        }
        this.pageArray = pageArray
      },
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
    },
    created() {
      this.getPages()
    }
  }
</script>