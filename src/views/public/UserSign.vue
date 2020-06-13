<template>
  <section>
     <article class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><router-link :to="{name: 'home'}">Home</router-link></li>
          <li class="breadcrumb-item active">Area clientes    </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading mb-0">Area clientes</h1>
        </div>
      </div>
    </article>
    <!-- customer login-->
    <article>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Iniciar sesión</h6>
              </div>
              <div class="block-body">
                <p class="lead">¿Ya eres cliente?</p>
                <p class="text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <hr>
                <form action="customer-orders.html" method="get">
                  <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input id="email" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control">
                  </div>
                  <div class="form-group text-center">
                    <button type="submit" class="btn btn-outline-dark"><i class="fa fa-sign-in-alt mr-2"></i> Iniciar sesión</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Nuevo cliente</h6>
              </div>
              <div class="block-body"> 
                <p class="lead">¿Aún no eres cliente?</p>
                <p class="text-muted">With registration with us new world of fashion, fantastic discounts and much more opens to you! The whole process will not take you more than a minute!</p>
                <p class="text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p>
                <hr>
                <form action="customer-orders.html" method="get">
                  <div class="form-group">
                    <label for="name" class="form-label">Nombre</label>
                    <input id="name" type="text" class="form-control">
                  </div>
   
                  <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input id="email" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control">
                  </div>
                  <div class="ml-4 form-group custom-checkbox">
                    <input id="show-shipping-address" type="checkbox" name="clothes-brand" class="custom-control-input">
                    <label for="show-shipping-address" data-toggle="collapse" data-target="#shippingAddress" aria-expanded="false" aria-controls="shippingAddress" class="custom-control-label align-middle">Acepto recibir comunicador comerciales de Macalola</label>
                  </div>
                  <div class="ml-4 form-group custom-checkbox">
                    <input id="show-shipping-address" type="checkbox" name="clothes-brand" class="custom-control-input">
                    <label for="show-shipping-address" data-toggle="collapse" data-target="#shippingAddress" aria-expanded="false" aria-controls="shippingAddress" class="custom-control-label align-middle">Acepto los terminos y condiciones</label>
                  </div>
                  <div class="form-group text-center">
                    <button type="submit" class="btn btn-outline-dark"><i class="far fa-user mr-2"></i>Registrarse                                </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>

</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  
</style>