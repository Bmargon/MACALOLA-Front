<template lang="pug">
section.template
    article.mb-5
      b-row.template__actions
        b-button.mr-3(variant="success" :disabled="disabled" type="submit" @click.prevent="updateTemplate" ) Guardar
        b-button.mr-3(variant="secondary" @click="disabled = !disabled") Editar
    article.mb-5
      b-row
        b-col
          b-card(title="Precio envío")
            b-form-input(:disabled="disabled" type="number" v-model="config.sendPrice")
        b-col
          b-card(title="Teléfono de contacto")
            b-form-input(:disabled="disabled" v-model="config.tlfContant")
    article.mb-5
      b-row
        b-col
          b-card(title="Email de contacto")
            b-form-input(:disabled="disabled" v-model="config.emailOnDisplay")
        b-col
          b-card(title="Envio gratuito a partir de")
            b-form-input(:disabled="disabled" v-model="config.moneyBack")
    article.mb-5
      b-row
        b-col
          b-card(title="Dirección")
            b-form-group
              b-form-input(:disabled="disabled" placeholder="Calle" v-model="config.adress.street").mb-2
              b-form-input(:disabled="disabled" placeholder="Número" v-model="config.adress.door").mb-2
              b-form-input(:disabled="disabled" placeholder="CCAA" v-model="config.adress.CA").mb-2
              b-form-input(:disabled="disabled" placeholder="Ciudad" v-model="config.adress.city").mb-2
              b-form-input(:disabled="disabled" placeholder="Codigo postal" v-model="config.adress.code").mb-2
              b-form-input(:disabled="disabled" placeholder="País" v-model="config.adress.country")

        b-col
          b-card(title="Carrusel")
            b-form-group(v-for="(item, i) in config.carousel" :key="i")
              .carousel__actions
                strong {{i + 1}}
                b-button(type="text" @click="removeItemToCarousel(i)")
                  i.fas.fa-trash-alt( )
              b-form-input(:disabled="disabled" placeholder="Titulo" v-model="item.title").mb-1
              b-form-input(:disabled="disabled" placeholder="Subtitulo" v-model="item.subtitle").mb-1
              b-form-input(:disabled="disabled" placeholder="Imágen" v-model="item.img").mb-1
              b-form-input(:disabled="disabled" placeholder="Nombre Boton" v-model="item.button")
              hr
            
            b-button(:disabled="disabled" variant="success" @click="addItemToCarousel") Añadir elemento
    article.mb-5
      b-row
        b-col
          b-card(title="Template")
            b-form-group(v-for="(item, i) in config.template" :key="i")
              b-form-input(:disabled="disabled" placeholder="Titulo" v-model="item.title").mb-1
              b-form-input(:disabled="disabled" placeholder="Imágen" v-model="item.img").mb-1
              b-form-input(:disabled="disabled" placeholder="Button" v-model="item.button").mb-1


        b-col
          b-card(title="Redes sociales")
            b-form-group(v-for="(item, i) in config.social" :key="i")
              i(:class="item.icon")
              b-form-input(:disabled="disabled" placeholder="Link" v-model="item.link").mb-1

</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      disabled: true,
      config: {
        sendPrice: 0,
        tlfContant: '',
        emailOnDisplay: '',
        moneyBack: 0,
        adress: {
          street: '',
          door: '',
          CA: '',
          city: '',
          code: 0,
          country: 'España'
        },
        carousel: [
          {title: '', subtitle: '', img: '', button: ''}
        ],
        template: [
          {title: '', img: '',button: ''},
          {title: '', img: '',button: ''},
          {title: '', img: '',button: ''},
          {title: '', img: '',button: ''},
        ],
        social: [
          {title: 'Facebook', icon: 'fab fa-facebook', link: ''},
          {title: 'Instagram', icon: 'fab fa-instagram', link: ''},
          {title: 'Pinterest', icon: 'fab fa-pinterest', link: ''},
          {title: 'Youtube', icon: 'fab fa-youtube', link: ''},
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getGlobalConfiguration'])
  },
  methods: {
    addItemToCarousel () {
      this.config.carousel.push(
        {title: '', subtitle: '', img: '', button: ''}
      )
    },
    removeItemToCarousel (index) {
      if (this.config.carousel.length === 1) return
      this.config.carousel.splice(index, 1)
    },

    async updateTemplate () {
      // const form = new FormData()
      // form.append('sendPrice',         this.config.sendPrice)
      // form.append('tlfContant',        this.config.tlfContant)
      // form.append('emailOnDisplay',    this.config.emailOnDisplay)
      // form.append('moneyBack',         this.config.moneyBack)
      // form.append('adress',             JSON.stringify(this.config.adress))
      // form.append('carousel',          JSON.stringify(this.config.carousel))
      // form.append('template',          JSON.stringify( this.config.template))
      // form.append('social',            JSON.stringify(this.config.social))
      // console.log(this.config);
      try {

        let url = process.env.VUE_APP_URL + '/set-config'

        await axios.put(url, {
          sendPrice: this.config.sendPrice,
          tlfContant: this.config.tlfContant,
          emailOnDisplay: this.config.emailOnDisplay,
          moneyBack: this.config.moneyBack,
          adress:  JSON.stringify(this.config.adress),
          carousel: JSON.stringify(this.config.carousel),
          template: JSON.stringify( this.config.template),
          social: JSON.stringify(this.config.social),
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('adminToken')
          }
        })
        this.$bvToast.toast('Hecho!', {
          title: `Template actualizado correctamente`,
          variant: 'success',
          solid: true,
        })
        this.disabled = true
      } catch (error) {
        this.$bvToast.toast('Error', {
          title: `No se pudo actualizar el template`,
          variant: 'danger',
          solid: true
        })
      }
    },
    async setConfig () {
      let response = await this.getGlobalConfiguration.data.data
        this.config.sendPrice = response.sendPrice
        this.config.tlfContant = response.tlfContant
        this.config.emailOnDisplay = response.emailOnDisplay
        this.config.moneyBack = response.moneyBack
        this.config.adress = response.adress
        this.config.carousel = JSON.parse(response.carousel)
        this.config.template = JSON.parse(response.template)
        this.config.social = JSON.parse(response.social)
    }      
  },
  created () {
    this.setConfig()
  }
}
</script>
<style lang="scss" scoped>
.template{
  &__actions{
    display: flex;
    justify-content: flex-end;
  }
}
  .carousel{
    &__actions {
      display: flex;
      justify-content: space-between;
    }
  }
  svg{
    transform: scale(1.1);
  }
</style>