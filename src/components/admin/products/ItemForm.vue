<template lang="pug">

  section.form
    b-form(@submit.prevent="onSubmit")

      b-form-group(label="Proveedor")
        b-form-input(v-model="form.provider" required)
  
      b-form-group(label="Fecha de compra")
        b-form-datepicker(v-model="form.buyDate" required)
    
      b-form-group(label="Tempoarada")
        b-form-input(v-model="form.season" required)

      b-form-group(label="Nombre del producto")
        b-form-input( v-model="form.name" required)

      b-form-group( label="Precio de compra")
        b-form-input( v-model="form.purchasePrice" type="number" required)

      b-form-group( label="Precio de venta")
        b-form-input(v-model="form.salePrice" type="number" required)

      b-form-group( label="Porcentaje")
        b-form-input( v-model="form.percentage" type="number" required)

      b-form-group( label="En promocion")
        b-form-checkbox(
          v-model="form.promotionOn" 
          name="promotionOn"
          value="true"
          unchecked-value="false")

      b-form-group( label="Numero de referencia")
        b-form-input(required  v-model="form.referenceNumberCommon")
  
      b-form-group( label="Descripcion")
        b-form-textarea(v-model="form.description")
  
      b-form-group( label="Categoria")
        b-form-select(v-model="form.category")
          b-form-select-option( v-for="category in categories" :key="category.referenceNumber" :value="category._id") {{category.name}}

      b-form-group( label="Accesorio")
        b-form-checkbox(
          name="promotionOn"
          value="true"
          v-model="form.accesory"
          unchecked-value="false")
  
      .form__stock
        b-form-group( label="Stock")
          hr
          b-row(v-for="(item, index) in form.stock" :key="index" )
    
            b-button.mt-3(variant="link" @click="removeItem(index)")
              i(class="fas fa-minus")
            b-button.mt-3(variant="link" @click="addItem()")
              i(class="fas fa-plus")
  
            b-col
              b-form-group( label="Referencia")
              b-input(
                v-model="item.ref"
                class="mb-2 mr-sm-2 mb-sm-0"
                :placeholder="item.ref")
            b-col
              b-form-group( label="Color")
              b-input( 
                v-model="item.color"
                class="mb-2 mr-sm-2 mb-sm-0"
                :placeholder="item.color")
            b-col
              b-row(v-for="(units, i) in item.quantity" :key="i").mt-3
                b-col
                  b-form-group( label="Talla")
                    b-input( v-model="units.size")
                b-col
                  b-form-group( label="Cantidad")
                    b-input(type="number" v-model="units.units")
                b-button(variant="link" @click="addQuantity(index)")
                  i(class="fas fa-plus")
                b-button(variant="link" @click="removeQuantity(index)")
                  i(class="fas fa-minus")
      b-button(variant="outline-primary" type="submit") Crear

</template>
<script>
import {mapActions, mapGetters} from 'vuex'
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
        stock: [
          {ref: '', color: '', quantity: [ 
            {size: '', units: 0}
          ]}
        ],
        accesory: false,
        category: '',
        img: ''
      }
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    ...mapActions(['getCategories']),
    onSubmit () {
      console.log(this.form);
    },
    addQuantity (i) {
      this.form.stock[i].quantity.push({size: '', units: 0})
    },
    removeQuantity (i) {
      if (this.form.stock[i].quantity.length === 1) {
        return
      }
      this.form.stock[i].quantity.splice(i, 1)
    },
    removeItem(i) {
      if (this.form.stock.length === 1) {
        return
      }
      this.form.stock.splice(i, 1)
    },
    addItem() {
      this.form.stock.push({ref: '', color: '', quantity: [ 
        {size: '', units: 0}
      ]})
    },
  },
  created() {
    this.getCategories()
  }

}
</script>