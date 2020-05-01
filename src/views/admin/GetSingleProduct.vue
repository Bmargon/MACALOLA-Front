<template lang="pug">
b-overlay(:show="loading" opacity="0.6" rouded)
  section.product
    b-row.product__options
      b-button.mr-3(variant="success" :disabled="disabledFields" ) Guardar
      b-button.mr-3(variant="secondary" @click="editItem") Editar
      b-button(variant="danger") Eliminar

    b-row.product__row
      b-col(cols="4")
        div.product__img
          img(:src="product.img", alt="alt")
      b-col(cols="8")
        b-form
          b-row
            b-col
              b-form-group(:disabled="disabledFields" label="Nº de Referencia")
                b-form-input(v-model="form.referenceNumberCommon")
            b-col
              b-form-group(:disabled="disabledFields" label="Proveedor")
                b-form-input(v-model="form.provider")
            b-col
              b-form-group(:disabled="disabledFields" label="Temporada")
                b-form-input(v-model="form.season")
          b-row
            b-col
              b-form-group(:disabled="disabledFields" label="Nombre")
                b-form-input(v-model="form.name")
            b-col
              b-form-group(:disabled="disabledFields" label="Fecha de compra")
                b-form-datepicker(v-model="form.buyDate")
            b-col
              b-form-group(:disabled="disabledFields" label="Total Stock")
                b-form-input(v-model="form.totalStock")
          b-row
            b-col()
              b-form-group(:disabled="disabledFields" label="Promocion")
                b-form-checkbox(v-model="form.promotionOn")
            b-col
              b-form-group(:disabled="disabledFields" label="Precio de compra")
                b-form-input(v-model="form.purchasePrice")
            b-col
              b-form-group(:disabled="disabledFields" label="Precio de venta")
                b-form-input(v-model="form.salePrice")
            b-col
              b-form-group(:disabled="disabledFields" label="Porcentaje")
                b-form-input(v-model="form.percentage" :placeholder="checkPromotion")
            b-col(v-if="form.promotionOn")
              b-form-group(:disabled="disabledFields" label="Precio con porcentaje")
                b-form-input(v-model="form.priceWithDiscount")
          b-row(v-if="!product.accesory")
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

          b-row
            b-form-group( label="Imagen")
              b-form-file( :disabled="disabledFields" v-model="form.img" type="file" accept="image/jpeg, image/png")
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'GetSingleProduct',
  data() {
    return {
      loading: false,
      disabledFields: true,
      form: {
        referenceNumberCommon: '',
        provider: '',
        season: '',
        name: '',
        buyDate: '',
        totalStock: 0,
        purchasePrice: 0,
        salePrice: 0,
        percentage: 0,
        stock: [],
        promotionOn: '',
        img: '',
        priceWithDiscount: ''
      }
    }
  },
  computed: {
    ...mapGetters(['product']),
    checkPromotion() {
      if (!this.form.promotionOn) {
        this.form.percentage = 0
        return 0
      }
    }
  },
  methods: {
    ...mapActions(['getSingleProduct']),
    editItem () {
      this.disabledFields = !this.disabledFields
      const formData = new FormData()
      formData.append('provider', this.form.provider)
      formData.append('buyDate', this.form.buyDate)
      formData.append('season', this.form.season)
      formData.append('name', this.form.name)
      formData.append('purchasePrice', this.form.purchasePrice)
      formData.append('salePrice', this.form.priceWithDiscount || this.form.salePrice)
      formData.append('percentage', this.form.percentage)
      formData.append('promotionOn', this.form.promotionOn)
      formData.append('description', this.form.description)
      formData.append('stock', this.form.stock || [])
      formData.append('accesory', this.form.accesory)
      formData.append('totalStock', this.form.totalStock)
      formData.append('category', this.form.category)
      formData.append('img', this.form.img)
    }
  },
  async created() {
    try {
      this.loading = true
      await this.getSingleProduct(this.$route.params.ref)
      this.form.referenceNumberCommon = this.product.referenceNumberCommon
      this.form.provider = this.product.provider
      this.form.season = this.product.season
      this.form.name = this.product.name
      this.form.buyDate = this.product.buyDate
      this.form.totalStock = this.product.totalStock
      this.form.purchasePrice = this.product.purchasePrice
      this.form.salePrice = this.product.salePrice
      this.form.percentage = this.product.percentage
      this.form.stock = this.product.stock
      this.form.promotionOn = this.product.promotionOn
      this.form.img = this.product.img
      this.form.priceWithDiscount = this.product.salePrice
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  },
}
</script>
<style lang="scss" scoped>
  .product {
    &__options {
      display: flex;
      justify-content: flex-end;
    }
    &__row {
      padding: 2rem;
    }
    &__img {
      img {
        width: 450px;
      }
    }
  }
</style>