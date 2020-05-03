<template>
  <div>
    <Nav/>
    <transition  name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import RouterView from '@/components/shared/RouterView'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export default {
  components: {
    RouterView,
    Nav,
    Footer
  }
}
</script>
