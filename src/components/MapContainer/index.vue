<template>
  <div id="container" style="width: 100vw; height: 100vh"></div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import bus from '@/eventBus/index.js'
import { getCode } from '@/common/location'
window._AMapSecurityConfig = {
  securityJsCode: 'c32116233cf0e683fba413b1107af42b'
}
export default {
  data () {
    return {
      map: null,
      autoOptions: {
        input: ''
      },
      searchPlaceInput: '',
      auto: null,
      placeSearch: ''
    }
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: 'a2d7874b9cc1b9b272f317db8c856fa4', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.HawkEye',
          'AMap.MapType',
          'AMap.Geolocation',
          'AMap.PlaceSearch',
          'AMap.AutoComplete',
          'AMap.Geocoder'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            center: [121.473667, 31.230525] // 初始化地图中心点位置
          })
          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.ToolBar())
          this.map.addControl(new AMap.HawkEye())
          this.map.addControl(new AMap.MapType())
          this.map.addControl(new AMap.Geolocation())
          this.auto = new AMap.AutoComplete(this.autoOptions)
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map
          }) // 构造地点查询类
          this.auto.on('select', this.select)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    setLocationEls (value) {
      getCode(value, this.map)
    },
    select (e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) // 关键字查询查询
    }
  },
  created () {
    bus.$on('searchUserInput', (val) => {
      this.autoOptions.input = val.inputId
      this.searchPlaceInput = val.userInput
    })
  },
  watch: {
    searchPlaceInput (newValue) {
      newValue && this.placeSearch.search(newValue)
    }
  },
  mounted () {
    // DOM初始化完成进行地图初始化
    this.initMap()
  }

}
</script>

<style></style>
