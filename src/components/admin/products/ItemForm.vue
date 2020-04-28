<template lang="pug">
  section
    b-form(@submit="onSubmit")
      b-form-group(label="Proveedor")
        b-form-input( required)
      b-form-group(label="Fecha de compra")
        b-form-datepicker(v-model="buyDate")
      b-form-group(label="Tempoarada")
        b-form-input( required)
      b-form-group(label="Nombre del producto")
        b-form-input( required)
      
</template>
<script>
export default {
  name: 'ItemForm',
  data () {
    return {
      form: {
        provider: '',
        buyDate: '',
        season: '',
        name: '',
        purchasePrice: 0,
        salePrice: 0,
        percentage: 0,
        promotionOn: false,
        referenceNumberCommon: '',
        description: '',
        stock: [],
        totalStock: 0,
        accesory: false,
        category: ''
      }
    }
  },
  methods: {
    onSubmit () {

    }
  }
}
</script>