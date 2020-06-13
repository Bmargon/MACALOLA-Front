<template >
  <section>
    <hero-category/>
    <div class="product">
      <product-category
        v-for="(item, index) in products"
        :key="index"
        :content="item"
      />
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import HeroCategory from '@/components/category/Hero'
import ProductCategory from '@/components/category/Product'
import EventBus from '@/utils/EventBus'

export default {
  name: 'Category',
  components: {
    HeroCategory,
    ProductCategory
  },
  data() {
    return {
      products: []
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
          let response = await axios.get(url)
          this.products = response.data.productsDB
        }
      } catch (error) {
        console.log('error', error)
      }
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
  width: 100%;
  margin: 0 2rem;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    margin: 0;
    justify-content: center;
  }
}


</style>