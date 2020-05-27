<template >
  <section>
    <hero-category/>
    <product-category
      v-for="(item, index) in products"
      :key="index"
      :content="item"
    />
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
        if (this.$route.params.cat === 'offers') {

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
content