<template lang="pug">
  section.form
    b-form(@submit="onSubmit")
      b-form-group(label="Proveedor")
        b-form-input( required)
      b-form-group(label="Fecha de compra")
        b-form-datepicker()
      b-form-group(label="Tempoarada")
        b-form-input( required)
      b-form-group(label="Nombre del producto")
        b-form-input( required)
      b-form-group( label="Precio de compra")
        b-form-input( type="number" required)
      b-form-group( label="Precio de venta")
        b-form-input( type="number" required)
      b-form-group( label="Porcentaje")
        b-form-input( type="number" required)
      b-form-group( label="En promocion")
        b-form-checkbox(
          name="promotionOn"
          value="true"
          unchecked-value="false")
      b-form-group( label="Numero de referencia")
        b-form-input(required)
      b-form-group( label="Descripcion")
        b-form-textarea()
      b-form-group( label="Accesorio")
        b-form-checkbox(
          name="promotionOn"
          value="true"
          unchecked-value="false")
      .form__stock
        b-form-group( label="Stock")
          hr
          b-row(v-for="(item, index) in form.stock")
    
            b-button.mt-3(variant="link" @click="removeItem(index)")
              i(class="fas fa-minus")
            b-button.mt-3(variant="link" @click="addItem()")
              i(class="fas fa-plus")
  
            b-col
              b-form-group( label="Referencia")
              b-input(
                class="mb-2 mr-sm-2 mb-sm-0"
                :placeholder="item.ref")
            b-col
              b-form-group( label="Color")
              b-input( 
                class="mb-2 mr-sm-2 mb-sm-0"
                :placeholder="item.color")
            b-col
              b-row(v-for="(units) in item.quantity").mt-3
                b-col
                  b-form-group( label="Talla")
                    b-input()
                b-col
                  b-form-group( label="Cantidad")
                    b-input(type="number" )
                b-button(variant="link" @click="addQuantity(index)")
                  i(class="fas fa-plus")
                b-button(variant="link" @click="removeQuantity(index)")
                  i(class="fas fa-minus")

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
        stock: [
          {ref: 'Referencia', color: 'Color', quantity: [ 
            {size: 'M', units: 3}
          ]}
        ],
        totalStock: 0,
        accesory: false,
        category: ''
      }
    }
  },
  methods: {
    onSubmit () {

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
      this.form.stock.push({ref: 'Referencia', color: 'Color', quantity: [ 
        {size: 'M', units: 3}
      ]})
    }
  }
}
</script>