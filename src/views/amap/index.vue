<template>
  <div class="amap-page-container">
    <el-amap  :center="center" :zoom="zoom" @init="init" class="amap-demo" />
  </div>
</template>

<style>
.amap-page-container {
  height: 100vh;
  width: 100vw;
}
.amap-demo {
  height: 300px;
}
</style>

<script>
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap'
import { getCode } from '../../common/location'
export default {
  data: function () {
    return {
      zoom: 12,
      center: [111.59996, 31.197646],
      map: null
    }
  },
  mounted () {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map('amapContainer', {
        center: new AMap.LngLat(121.59996, 31.197646),
        zoom: this.zoom
      })
      this.map.on('click', (e) => {
        console.log(e)
      })
    })
  },
  methods: {
    init (map) {
      const marker = new AMap.Marker({
        position: [121.59996, 31.197646]
      })
      map.add(marker)
      this.map = map
    },
    setLocationEls (value) {
      console.log(this.map)
      getCode(value, this.map)
    }
  }
}
</script>
<style>
    .amap-demo {
      height: 300px;
    }
  </style>
