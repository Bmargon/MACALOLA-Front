<template >
  <section>
    <hero-category/>
    <grid-header-category></grid-header-category>
    <div class="product container">
      <product-category
        v-for="(item, index) in products"
        :key="index"
        :content="item"
      />
    </div>
    <Pagination
      :totalProducts="totalProducts"
      :totalProductsPerPage="1"
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
      totalProducts: 0
    }
  },
  methods: {
    async getProducts (cat) {
      try {
        if (this.$route.params.cat === 'ofertas') {
        let url = process.env.VUE_APP_URL + '/offers'
          let response = await axios.get(url)
          this.products = response.data.productDB

        } else {
          let url = process.env.VUE_APP_URL + '/bycategory/' + this.$route.params.cat 
          let response = await axios.get(url, {
            params: {
              from : this.from
            }
          })
          this.totalProducts = response.data.total
          this.products = response.data.productsDB
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    updateProductsOnPageChange(page) {
      this.from = page
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