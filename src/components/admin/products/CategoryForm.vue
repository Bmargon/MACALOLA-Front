<template lang="pug">
  section
    h1
    b-row
      b-col
        b-row.mb-3
          h3 Categorias actuales
          b-button(variant="link" @click="addCategory")
            i(class="fas fa-plus")
        b-row(v-if="createNew")
          b-form-group(label="Nombre").mr-3
            b-form-input( v-model="category.name" required)
          b-form-group(label="Referencia")
            b-form-input( v-model="category.referenceNumber" type="number" required)
          b-button(variant="text" @click="postCategory") Añadir
        b-list-group
          b-list-group-item(v-for="(item, i) in categories" :key="i") {{item.name}} {{item.referenceNumber}}
            b-button(variant="link" @click="removeCategory(i)")
              i(class="fas fa-minus")
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: 'CategoryForm',
  data () {
    return {
      createNew: false,
      category: {
        name: '',
        referenceNumber: ''
      }
    }
  },
  methods: {
  ...mapActions(['getCategories']),
    addCategory() {
      this.createNew = true
    },
    async postCategory() {
     try {
       let token = localStorage.getItem('adminToken')
        await axios.post('http://localhost:3000/category', this.category, {
        headers: {
          'authorization': token,
        }
      })
      await this.getCategories()
      //this.$forceUpdate()
     } catch (error) {
       console.log(error);
     }
    },
    async removeCategory (index) {
      try {
        let token = localStorage.getItem('adminToken')
        let id = this.categories[index]._id
        await axios.delete(`http://localhost:3000/category/${id}`, {
          headers: {
            'authorization': token,
          }
        })
        await this.getCategories()
      } catch (error) {     
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  created() {
    this.getCategories()
  }
}
</script>