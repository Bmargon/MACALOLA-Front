<template lang="pug">
  section.main

    div.main__links
      b-card( 
        v-for="(item, i ) in quickAccess"
        :key="i"
        :title="item.title"
        :img-src="item.img"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2")
        b-card-text {{ item.description }}
        b-button(:href="item.link" target="_blank" variant="primary") Acceder

</template>

<script>
export default {
  data () {
    return {
      quickAccess: [
        {title: 'WebMail', description: 'Accede al email personalizado de Macalola', img: 'https://res.cloudinary.com/macalola/image/upload/v1587926087/front-assets/email_wwljtp.jpg', link: 'https://webmail.macalola.com/'},
        {title: 'Stripe', description: 'Accede a la plataforma de pagos',img: 'https://res.cloudinary.com/macalola/image/upload/v1587926075/front-assets/1_xfFgXC_mdItfNN56cuXkAQ_ejcwv3.png', link: 'https://stripe.com/es'},
        {title: 'Cloudinary', description: 'Accede al gestor de imagenes',img: 'https://res.cloudinary.com/macalola/image/upload/v1587926050/front-assets/cloudinary_a6gnlh.jpg', link: 'https://cloudinary.com/'},
        {title: 'MailChimp', description: 'Crea campañas de marketing por email',img: 'https://res.cloudinary.com/macalola/image/upload/v1587926035/front-assets/mailchimp_mmatn7.jpg', link: 'https://mailchimp.com/'},
        {title: 'Google Analytics', description: 'Analiza la audiencia del sitio',img: 'https://res.cloudinary.com/macalola/image/upload/v1588337665/front-assets/como-insertar-el-codigo-de-google-analaytics-en-tu-web_cjzvil.jpg', link: 'https://analytics.google.com/'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.card{
  margin-right: 2rem;
}
.main{
  &__links {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>