<template lang="pug">
  section
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
    // CREAR CATEGORIA
    async postCategory() {
     try {
       let token = sessionStorage.getItem('adminToken')
        await axios.post('http://localhost:3000/category', this.category, {
        headers: {
          'authorization': token,
        }
      })
      this.category.name = ''
      this.category.referenceNumber = ''
      await this.getCategories()
     } catch (error) {
       this.$bvToast.toast('Error', {
          title: `No se pudo crear la categoria`,
          variant: 'danger',
          solid: true
        })
     }
    },
    // ELIMINAR CATEGORIA
    async removeCategory (index) {
      try {
        let token = sessionStorage.getItem('adminToken')
        let id = this.categories[index]._id
        await axios.delete(`http://localhost:3000/category/${id}`, {
          headers: {
            'authorization': token,
          }
        })
        await this.getCategories()
      } catch (error) {     
        this.$bvToast.toast('Error', {
          title: `No se pudo borrar la categoria`,
          variant: 'danger',
          solid: true
        })
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