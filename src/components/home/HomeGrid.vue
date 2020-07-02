<template>
<div class="grid mt-3">
    <section>
      <div class="container-fluid px-5px">
        <div class="row mx-0">
          <div class="col-md-6 mb-10px px-5px">
            <div class="card border-0 text-white text-center"><b-img-lazy :src="parseGrid[0].img" alt="Card image" class="card-img" />
              <div class="card-img-overlay d-flex align-items-center"> 
                <div class="w-100 py-3">
                  <h2 class="display-3 font-weight-bold mb-4">{{parseGrid[0].title}}</h2><router-link  class="btn btn-light" :to="{path: '/c/' + parseGrid[0].button}">Ver ahora</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-10px px-5px">
            <div class="card border-0 text-white text-center"><b-img-lazy :src="parseGrid[1].img" alt="Card image" class="card-img" />
              <div class="card-img-overlay d-flex align-items-center"> 
                <div class="w-100 py-3">
                  <h2 class="display-3 font-weight-bold mb-4">{{parseGrid[1].title}}</h2><router-link  class="btn btn-light" :to="{path: '/c/' + parseGrid[0].button}">Ver ahora</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col-lg-4 mb-10px px-5px">
            <div class="card border-0 text-center text-white"><b-img-lazy :src="parseGrid[2].img" alt="Card image" class="card-img" />
              <div class="card-img-overlay d-flex align-items-center"> 
                <div class="w-100">
                  <h2 class="display-4 mb-4">{{parseGrid[2].title}}</h2><router-link :to="{path: '/p/' + parseGrid[0].button}" class="btn btn-link text-white"> Ver ahora <i class="fa-arrow-right fa ml-2"></i></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-10px px-5px">
            <div class="card border-0 text-center text-white"><b-img-lazy :src="parseGrid[3].img" alt="Card image" class="card-img" />
              <div class="card-img-overlay d-flex align-items-center"> 
                <div class="w-100">
                  <h2 class="display-4 mb-4">{{parseGrid[3].title}}</h2><router-link class="btn btn-link text-white" :to="{path: '/p/' + parseGrid[0].button}"> Ver ahora <i class="fa-arrow-right fa ml-2"></i></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-10px px-5px">
            <div class="card border-0 text-center text-white"><b-img-lazy :src="parseGrid[4].img" alt="Card image" class="card-img" />
              <div class="card-img-overlay d-flex align-items-center"> 
                <div class="w-100">
                  <h2 class="display-4 mb-4">{{parseGrid[4].title}}</h2><router-link :to="{path: '/p/' + parseGrid[0].button}" class="btn btn-link text-white">Ver ahora <i class="fa-arrow-right fa ml-2"></i></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HomeGrid',
    computed: {
    ...mapGetters(['getGlobalConfig']),
     parseGrid() {
        return JSON.parse(this.getGlobalConfig.template)
      }
  }
}
</script>
<style lang="scss" scoped>
  .grid{
    height: 100%;
  }
</style>