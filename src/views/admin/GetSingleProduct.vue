<template lang="pug">
b-overlay(:show="loading" opacity="0.6" rouded)
  section.product
    b-row.product__options

        b-button.mr-3(variant="success" :disabled="disabledFields" @click="saveItem" ) Guardar
        b-button.mr-3(variant="secondary" @click="editItem") Editar
        b-button(variant="danger" @click="removeItem") Eliminar

    b-row.product__row
      b-col(cols="4")
        div.product__img
          img(:src="product.img", alt="alt")

      b-col(cols="8")
        b-form
          b-row
            b-col
              b-form-group(disabled label="Nº de Referencia")
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
                b-form-input(v-model="form.purchasePrice" type="number")

            b-col
              b-form-group(:disabled="disabledFields" label="Precio de venta")
                b-form-input(v-model="form.salePrice" type="number")
                
            b-col(v-if="form.promotionOn")
              b-form-group(:disabled="disabledFields" label="Porcentaje")
                b-form-input(v-model="form.percentage" type="number")

            b-col(v-if="form.promotionOn")
              b-form-group(disabled label="Precio con porcentaje")
                b-form-input(:placeholder="checkPromotion" type="number")

          b-row()
            b-form-group(:disabled="disabledFields" label="Accesorio").mr-5
              b-form-checkbox(v-model="form.accesory")
            b-form-group( v-if="form.accesory" label="Cantidad accesorio")
              b-form-input( v-model="form.totalStock" type="number")

          b-row(v-if="!form.accesory")
           b-form-group( label="Stock")
            hr
            b-row(v-for="(item, index) in form.stock" :key="index" )
      
              b-button.mt-3( :disabled="disabledFields" variant="link" @click="removeItemFromStock(index)")
                i(class="fas fa-minus")

              b-button.mt-3(:disabled="disabledFields" variant="link" @click="addItem()")
                i(class="fas fa-plus")
    
              b-col
                b-form-group( label="Referencia")
                b-input(
                  :disabled="disabledFields"
                  v-model="item.ref"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :placeholder="item.ref")

              b-col
                b-form-group( label="Color")
                b-input( 
                  :disabled="disabledFields"
                  v-model="item.color"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :placeholder="item.color")

              b-col
                b-row(v-for="(units, i) in item.quantity" :key="i").mt-3
                  b-col
                    b-form-group( label="Talla")
                      b-input(:disabled="disabledFields"  v-model="units.size")
                  b-col
                    b-form-group( label="Cantidad")
                      b-input(:disabled="disabledFields" type="number" v-model="units.units")
                  b-button(:disabled="disabledFields" variant="link" @click="addQuantity(index)")
                    i(class="fas fa-plus")
                  b-button(:disabled="disabledFields" variant="link" @click="removeQuantity(index)")
                    i(class="fas fa-minus")

          b-row
            b-form-group( label="Imagen")
              b-form-file( :disabled="disabledFields" v-model="form.img" type="file" accept="image/jpeg, image/png")
</template>
<script>
import axios from 'axios'
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
        img: null,
        accesory: '',
        priceWithDiscount: 0
      }
    }
  },
  computed: {
    ...mapGetters(['product']),
    // CALCULAR DESCUENTO
    checkPromotion() {
      if (!this.form.promotionOn) {
        this.form.percentage = 0
        return 0
      } else {
        let final = this.form.salePrice * (this.form.percentage / 100)
        this.form.priceWithDiscount = this.form.salePrice - final
        return this.form.priceWithDiscount.toString()
      }
    }
  },
  methods: {
    ...mapActions(['getSingleProduct']),
    editItem () {
      this.disabledFields = !this.disabledFields
    },
    addQuantity (i) {
      this.form.stock[i].quantity.push({size: '', units: 0})
    },
    addItem() {
      this.form.stock.push({ref: '', color: '', quantity: [ 
        {size: '', units: 0}
      ]})
    },
    removeItemFromStock(i) {
      if (this.form.stock.length === 1) {
        return
      }
      this.form.stock.splice(i, 1)
    },
    removeQuantity (i) {
      if (this.form.stock[i].quantity.length === 1) {
        return
      }
      this.form.stock[i].quantity.splice(i, 1)
    },
    async removeItem () {
      try {
        this.loading = true
        await axios.delete(`http://localhost:3000/product/${this.form.referenceNumberCommon}`, {
          headers: {
            'authorization': sessionStorage.getItem('adminToken'),
          }
        })
        this.$router.push({path: '/administration/products'})
      } catch (error) {
        this.$bvToast.toast('Error', {
          title: `al borrar producto`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.loading = false
      }
    },
    async saveItem() {
      try {
        if (!this.form.accesory) {
        this.form.totalStock = 0
        this.form.stock.forEach((item) => {
            item.quantity.forEach((element) => {
              this.form.totalStock += Number(element.units)
            })
          })
        } 

        this.loading = true
        const formData = new FormData()
        formData.append('provider', this.form.provider)
        formData.append('buyDate', this.form.buyDate)
        formData.append('season', this.form.season)
        formData.append('name', this.form.name)
        formData.append('purchasePrice', this.form.purchasePrice)
        formData.append('salePrice', this.form.priceWithDiscount === 0 ? this.form.salePrice : this.form.priceWithDiscount)
        formData.append('percentage', this.form.percentage)
        formData.append('promotionOn', this.form.promotionOn)
        formData.append('description', this.form.description)
        formData.append('stock', JSON.stringify(this.form.stock) || [])
        formData.append('accesory', this.form.accesory)
        formData.append('totalStock', this.form.totalStock)
        formData.append('category', this.form.category)
        formData.append('img', this.form.img)

        await axios.put(`http://localhost:3000/product/${this.form.referenceNumberCommon}`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
            'authorization': sessionStorage.getItem('adminToken'),
          }
        })

        this.$bvToast.toast('Ok:)', {
          title: `Producto actualizado correctamente`,
          variant: 'success',
          solid: true
        })

        this.$router.push({path: '/administration/products'})

      } catch (error) {

        this.$bvToast.toast('Error', {
          title: `No se pudo actualizar el producto`,
          variant: 'danger',
          solid: true
        })
      } finally{
        
        this.loading = false
      }

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
      this.form.accesory = this.product.accesory
      this.form.priceWithDiscount = this.product.salePrice
      this.form.category = this.product.category
    } catch (error) {
      this.$bvToast.toast('Error', {
          title: `No se pudo obtener el producto`,
          variant: 'danger',
          solid: true
        })
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