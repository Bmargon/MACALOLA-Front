<template>
  <section>
    <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item">
            <router-link :to="{name: 'home'}">Home</router-link>
          </li>
          <li class="breadcrumb-item active">{{capitalize }}       </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">{{ $route.params.cat}}</h1>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  name: 'HeroCategory',
  computed: {
    capitalize () {
      let name = this.$route.params.cat.toLowerCase()
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
}
</script>