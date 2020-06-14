<template >
  <section>
    <hero-category/>
    <grid-header-category
      :totalProducts="totalProducts"
      @totalPerPage="totalPerPage"
    />
    <div class="product container">
      <product-category
        v-for="(item, index) in products"
        :key="index"
        :content="item"
      />
    </div>
    <Pagination
      :totalProducts="totalProducts"
      :totalProductsPerPage="totalProductsPerPage"
      @updateProductsOnPageChange="updateProductsOnPageChange"
    />
  </section>
</template>
<script>
import axios from 'axios'
import HeroCategory from '@/components/category/Hero'
import GridHeaderCategory from '@/components/category/GridHeader'
import Pagination from '@/components/shared/Pagination'
import ProductCategory from '@/components/category/Product'
import EventBus from '@/utils/EventBus'
export default {
  name: 'Category',
  components: {
    HeroCategory,
    ProductCategory,
    Pagination,
    GridHeaderCategory
  },
  data() {
    return {
      products: [],
      from: 0,
      totalProducts: 0,
      totalProductsPerPage: 20
    }
  },
  methods: {
    async getProducts (cat) {
      try {
        if (this.$route.params.cat === 'ofertas') {
        let url = process.env.VUE_APP_URL + '/offers'
          let response = await axios.get(url, {
            params: {
              from : this.from,
              total: this.totalProductsPerPage
            }
          })
          this.totalProducts = response.data.productsDB.length
          this.products = response.data.productsDB

        } else {
          let url = process.env.VUE_APP_URL + '/bycategory/' + this.$route.params.cat 
          let response = await axios.get(url, {
            params: {
              from : this.from,
              total: this.totalProductsPerPage
            }
          })
          this.totalProducts = response.data.productsDB.length
          this.products = response.data.productsDB
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    updateProductsOnPageChange(page) {
      this.from = page * 19
      this.getProducts()
    },
    totalPerPage(total) {
      this.totalProductsPerPage = total
      this.getProducts()
    }
  },
  created() {
    EventBus.$on('refresh', () => {
      this.getProducts()
    })
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.product{
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    margin: 0;
    justify-content: center;
  }
}


</style>