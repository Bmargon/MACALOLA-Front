<template lang="pug">
 b-overlay(:show="loading" opacity="0.6" rouded)
  section
    b-table(@row-clicked="getSingleItem" striped hover :items="producst" :fields="fields" :tbody-tr-class="rowClass")
</template>

<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex'

export default{
  name: 'ProductList',
  data() {
    return {
      loading: false,
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
    ...mapGetters(['producst'])
  },
  methods: {
    ...mapActions(['getAllProducts']),
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.totalStock === 0 ) return 'table-danger'
    },
    getSingleItem(item) {
      this.loading = true
      this.$router.push({path: `/administration/product/${item.referenceNumberCommon}`})
      this.loading = false
    }
  },
  async created() {
    this.loading = true
    try {
      await this.getAllProducts()
    } catch (error) {
      this.$bvToast.toast('Error', {
        title: `Error al cargar los productos`,
        variant: 'danger',
        solid: true
      })
      console.log(error)
    } finally {
      this.loading = false
    }
  },
}
</script>
