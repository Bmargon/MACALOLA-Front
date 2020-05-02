<template lang="pug">
 b-overlay(:show="loading" opacity="0.6" rouded)
  section
    b-table(@row-clicked="getSingleItem" id="table" striped hover :items="producst" :fields="fields" :tbody-tr-class="rowClass")
    b-pagination( 
      @change="changePage"
      v-model="currentPage"
      :per-page="perPage"
      aria-controls="table"
      :total-rows="rows")
</template>

<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex'

export default{
  name: 'ProductList',
  data() {
    return {
      loading: false,
      currentPage: 1,
      perPage: 19,
      fields: [
        {
          key: 'name',
          label: 'Nombre'
        },
        {
          key: 'referenceNumberCommon',
          label: 'Nº Referencia'
        },
        {
          key: 'accesory',
          label: 'Accesorio',
          sortable: true,
          formatter:  (value) => value ? 'Si' : 'No'
        },
        {
          key: 'category',
          label: 'Categoria',
          sortable: true,
          formatter:  (value) => value.name
        },
        {
          key: 'totalStock',
          label: 'Stock',
          sortable: true,
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['producst']),
    rows () {
      return this.producst.length
    },
  },
  methods: {
    ...mapActions(['getAllProducts']),
    changePage (value) {
      this.currentPage = 20 * (value - 1)
      console.log(value);
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.totalStock === 0 ) return 'table-danger'
    },
    getSingleItem(item) {
      this.loading = true
      this.$router.push({path: `/administration/product/${item.referenceNumberCommon}?from=${this.currentPage}`})
      this.loading = false
    }
  },
  async created () {
    this.loading = true
    try {
      await this.getAllProducts()
    } catch (error) {
      this.$bvToast.toast('Error', {
        title: `Error al cargar los productos`,
        variant: 'danger',
        solid: true
      })
    } finally {
      this.loading = false
    }
  },
}
</script>
