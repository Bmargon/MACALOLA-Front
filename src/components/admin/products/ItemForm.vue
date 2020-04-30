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
        b-form-input(v-model="form.salePrice" type="number" required) {{ calculateDiscount }}

      b-form-group( label="En promocion")
        b-form-checkbox(
          v-model="form.promotionOn" 
          name="promotionOn"
          )
          
      b-form-group( label="Porcentaje")
        b-form-input(:disabled="!form.promotionOn" v-model="form.percentage" type="number" required)

      b-form-group( v-if="form.promotionOn" label="Precio con porcentaje aplicado")
        b-form-input(disabled v-model="form.priceWithDiscount" type="number")

      b-form-group( label="Numero de referencia")
        b-form-input(required  v-model="form.referenceNumberCommon")
  
      b-form-group( label="Descripcion")
        b-form-textarea(v-model="form.description")
  
      b-form-group( label="Categoria")
        b-form-select(v-model="form.category")
          b-form-select-option( v-for="category in categories" :key="category.referenceNumber" :value="category._id") {{category.name}}

      b-form-group( label="Accesorio")
        b-form-checkbox(
          name="Accesorio"
          v-model="form.accesory")
  
      b-form-group( v-if="form.accesory" label="Total accesorios")
        b-form-input(v-model="totalStock" type="number")
  
      .form__stock(v-if="!form.accesory")
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
      b-form-group( label="Imagen")
        b-form-file( ref="file" v-model="form.img" type="file" accept="image/jpeg, image/png")
      br
      br
      b-button(variant="outline-primary" type="submit") Crear

</template>
<script>
import axios from 'axios'
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
        totalStock: 0,
        stock: [
          {ref: '', color: '', quantity: [ 
            {size: '', units: 0}
          ]}
        ],
        accesory: false,
        category: '',
        img: null,
        priceWithDiscount: ''
      }
    }
  },
  computed: {
    ...mapGetters(['categories']),
    calculateDiscount () {
      if (this.form.promotionOn) {
        let final = this.form.salePrice * (this.form.percentage / 100)
        this.form.priceWithDiscount = this.form.salePrice - final
        return this.form.priceWithDiscount
      }
    }
  },
  methods: {
    ...mapActions(['getCategories']),
    // selectImg () {
    //   console.log(this.$refs.file.files);
    //   this.form.img = this.$refs.file.files[0]
    // },
    async onSubmit () {
      const formData = new FormData()
      formData.append('provider', this.form.provider)
      formData.append('buyDate', this.form.buyDate)
      formData.append('season', this.form.season)
      formData.append('name', this.form.name)
      formData.append('purchasePrice', this.form.purchasePrice)
      formData.append('salePrice', this.form.priceWithDiscount || this.form.salePrice)
      formData.append('percentage', this.form.percentage)
      formData.append('promotionOn', this.form.promotionOn)
      formData.append('referenceNumberCommon', this.form.referenceNumberCommon)
      formData.append('description', this.form.description)
      formData.append('stock', this.form.stock)
      formData.append('accesory', this.form.accesory)
      formData.append('category', this.form.category)
      formData.append('img', this.form.img)

      // Calcular el total de todos los productos si no es accesorio
      if (!this.form.accesory) {
        this.form.stock.forEach((item) => {
          item.quantity.forEach((element) => {
            this.form.totalStock += Number(element.units)
          })
        })
      }
      //await axios.post('http://localhost:3000/' , formData)
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