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
            b-form-input( required)
          b-form-group(label="Referencia")
            b-form-input( type="number" required)
        b-list-group
          b-list-group-item(v-for="item in categories") {{item.name}}
            b-button(variant="link" @click="addCategory")
              i(class="fas fa-minus")
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'CategoryForm',
  data () {
    return {
      createNew: false,
      newCategory: {

      }
    }
  },
  methods: {
  ...mapActions(['getCategories']),
    addCategory() {
      this.createNew = true
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